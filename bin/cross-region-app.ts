#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CrossRegionAppStack } from '../lib/cross-region-app-stack';
import * as route53 from 'aws-cdk-lib/aws-route53'; 

const regionConfig = [
  {
    region: 'eu-west-2',
    target: route53.GeoLocation.country('GB'),
    certId: 'xxx'
  },
  {    
    region: 'eu-central-1',
    target: route53.GeoLocation.continent(route53.Continent.EUROPE),
    certId: 'xxx'
  }, 
  {
    region: 'us-east-1',
    target: route53.GeoLocation.default(),
    certId: 'xxxa'
  }
];

const domainName =  'xxx';
const hostedZoneId = 'xxx';
const app = new cdk.App();

regionConfig.forEach((individualRegion) => {

  new CrossRegionAppStack(app, `CrossRegionAppStack-${individualRegion.region}`, {
    stackName: `cross-region-app-failover-${individualRegion.region}`,
    region: individualRegion.region,
    hostedZoneId,
    target: individualRegion.target,
    domainName,
    certId: individualRegion.certId, 
    env: individualRegion
  });
});



