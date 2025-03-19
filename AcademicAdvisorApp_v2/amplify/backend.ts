import { defineBackend } from '@aws-amplify/backend';
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import { auth } from './auth/resource';
//import { data } from './data/resource';

const backend = defineBackend({
  auth,
//  data,
});

/*const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.us-east-2.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "us-east-2",
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    resources: [
      "arn:aws:bedrock:*::foundation-model/*",
      "arn:aws:bedrock:*:337909743922:inference-profile/*"
    ],
    actions: ["bedrock:InvokeModel"],
  })
);*/


// Add IAM policies for Bedrock
const bedrockPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ['bedrock:InvokeModel', 'bedrock:InvokeModelWithResponseStream', 'bedrock:GetAsyncInvoke'],
  resources: [
    "arn:aws:bedrock:*::foundation-model/*",
    "arn:aws:bedrock:*:*:inference-profile/*",
    "arn:aws:bedrock:*:*:async-invoke/*"
  ],
});

const bedrockAgentPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ['bedrock:InvokeAgent','bedrock:InvokeInlineAgent'],
  resources: [
    `*`
  ],
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(bedrockPolicy)
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(bedrockAgentPolicy)
