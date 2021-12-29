"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
exports.validateThemeConfig = exports.validateOptions = void 0;
var path_1 = require("path");
var utils_validation_1 = require("@docusaurus/utils-validation");
function pluginGoogleAnalytics(context, options) {
    var trackingID = options.trackingID, anonymizeIP = options.anonymizeIP;
    var isProd = process.env.NODE_ENV === 'production';
    return {
        name: 'docusaurus-plugin-google-analytics',
        getClientModules: function () {
            return isProd ? [path_1["default"].resolve(__dirname, './analytics')] : [];
        },
        injectHtmlTags: function () {
            if (!isProd) {
                return {};
            }
            return {
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preconnect',
                            href: 'https://www.google-analytics.com'
                        }
                    },
                    // https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tag
                    {
                        tagName: 'script',
                        innerHTML: "\n              window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;\n              ga('create', '".concat(trackingID, "', 'auto');\n              ").concat(anonymizeIP ? "ga('set', 'anonymizeIp', true);\n" : '', "\n              ga('send', 'pageview');\n            ")
                    },
                    {
                        tagName: 'script',
                        attributes: {
                            async: true,
                            src: 'https://www.google-analytics.com/analytics.js'
                        }
                    },
                ]
            };
        }
    };
}
exports["default"] = pluginGoogleAnalytics;
var pluginOptionsSchema = utils_validation_1.Joi.object({
    trackingID: utils_validation_1.Joi.string().required(),
    anonymizeIP: utils_validation_1.Joi.boolean()["default"](false)
});
function validateOptions(_a) {
    var validate = _a.validate, options = _a.options;
    return validate(pluginOptionsSchema, options);
}
exports.validateOptions = validateOptions;
function validateThemeConfig(_a) {
    var themeConfig = _a.themeConfig;
    if (themeConfig.googleAnalytics) {
        throw new Error('The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. More information at https://github.com/facebook/docusaurus/pull/5832.');
    }
    return themeConfig;
}
exports.validateThemeConfig = validateThemeConfig;
