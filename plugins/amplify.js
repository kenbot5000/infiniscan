// plugins/amplify.js
import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';

Vue.use(AmplifyPlugin, AmplifyModules);
