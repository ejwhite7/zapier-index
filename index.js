const App = {
    "version": "2.2.0",
    "platformVersion": "12.2.0",
    "authentication": {
        "type": "custom",
        "fields": [{
            "key": "bearer_token",
            "type": "string",
            "required": true,
            "helpText": "Please provide the API key to authenticate your account. <a href=\"https://app.beehiiv.com/settings/integrations#api-keys\">Click here to find your API key</a>"
        }],
        "test": {
            "url": "https://api.beehiiv.com/v2/publications"
        },
        "connectionLabel": "SUCCESS!"
    },
    "beforeRequest": [(request, z, bundle) => {
        request.headers.Authorization = bundle.authData.bearer_token;
        return request;
    }],
    "afterResponse": [],
    "triggers": {},
    "creates": {
        "PublicationsPublicationIdPostsPostIddelete": {
            "key": "PublicationsPublicationIdPostsPostIddelete",
            "noun": "Posts",
            "display": {
                "label": "Delete a Post",
                "description": "Deletes (a draft) or archives (a published) a post."
            },
            "operation": {
                "inputFields": [{
                    "key": "postId",
                    "label": "Post ID",
                    "helpText": "The prefixed ID of the post object",
                    "type": "string"
                }, {
                    "key": "publicationId",
                    "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'delete',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/posts/${bundle.inputData.postId}`,
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "postId": "post_00000000-0000-0000-0000-000000000000",
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSubscriptionspost": {
            "key": "PublicationsPublicationIdSubscriptionspost",
            "noun": "Subscriptions",
            "display": {
                "label": "Create a Subscriber",
                "description": "Creates a subscriber in your beehiiv account.",
                "important": true
            },
            "operation": {
                "inputFields": [{
                    "key": "publicationId",
                    "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "email",
                    "label": "Email",
                    "helpText": "The email address of the subscription.",
                    "type": "string",
                    "required": true
                }, {
                    "key": "reactivate_existing",
                    "label": "Reactivate existing?",
                    "helpText": "Whether or not to reactivate the subscription if they have already unsubscribed. This option should be used only if the subscriber is knowingly resubscribing.",
                    "type": "boolean"
                }, {
                    "key": "send_welcome_email",
                    "label": "Send Welcome Email",
                    "type": "boolean"
                }, {
                    "key": "utm_source",
                    "label": "UTM Source",
                    "helpText": "The source of the subscription.",
                    "type": "string"
                }, {
                    "key": "utm_medium",
                    "label": "UTM Medium",
                    "helpText": "The medium of the subscription",
                    "type": "string"
                }, {
                    "key": "utm_campaign",
                    "label": "UTM Campaign",
                    "helpText": "The acquisition campaign of the subscription",
                    "type": "string"
                }, {
                    "key": "referring_site",
                    "label": "Referring Site",
                    "helpText": "The website that the subscriber was referred from",
                    "type": "string"
                }, {
                    "key": "referral_code",
                    "label": "Referral Code",
                    "helpText": "This should be a subscribers referral_code. This gives referral credit for the new subscription.",
                    "type": "string"
                }, {
                    "key": "custom_field",
                    "label": "custom_field",
                    "children": [{
                        "key": "name",
                        "label": "Name",
                        "helpText": "The name of the existing custom field",
                        "type": "string"
                    }, {
                        "key": "value",
                        "label": "Value",
                        "helpText": "The value to stored for the subscription. Will be ignored if `delete: true` is included.",
                        "type": "string"
                    }, {
                        "key": "delete",
                        "label": "Delete?",
                        "helpText": "Optionally delete any value stored. If true, any passed in `value` attribute will be ignored.",
                        "type": "boolean"
                    }]
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'post',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/subscriptions`,
                        data: {
                            "email": bundle.inputData["email"],
                            "reactivate_existing": bundle.inputData["reactivate_existing"],
                            "send_welcome_email": bundle.inputData["send_welcome_email"],
                            "utm_source": bundle.inputData["utm_source"],
                            "utm_medium": bundle.inputData["utm_medium"],
                            "utm_campaign": bundle.inputData["utm_campaign"],
                            "referring_site": bundle.inputData["referring_site"],
                            "referrer_code": bundle.inputData["referrer_code"],
                            "custom_fields": [bundle.inputData["custom_field"]]
                        }
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "email": "bruce.wayne@wayneenterprise.com",
                    "utm_source": "WayneEnterprise",
                    "utm_medium": "organic",
                    "utm_campaign": "fall_2022_promotion",
                    "referring_site": "www.wayneenterprise.com/blog",
                    "custom_field": {
                        "name": "First Name",
                        "value": "Bruce"
                    }
                }
            }
        },
        "PublicationsPublicationIdSubscriptionsSubscriptionIdput": {
            "key": "PublicationsPublicationIdSubscriptionsSubscriptionIdput",
            "noun": "Subscriptions",
            "display": {
                "label": "Update a Subscriber",
                "description": "Updates custom fields and/or unsubscribes a subscriber."
            },
            "operation": {
                "inputFields": [{
                    "key": "subscriptionId",
                    "label": "Subscription ID",
                    "helpText": "The prefixed ID of the subscription object",
                    "type": "string"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "custom_field",
                    "label": "custom_field",
                    "children": [{
                        "key": "name",
                        "label": "Name",
                        "helpText": "The name of the existing custom field",
                        "type": "string"
                    }, {
                        "key": "value",
                        "label": "Value",
                        "helpText": "The value to stored for the subscription. Will be ignored if `delete: true` is included.",
                        "type": "string"
                    }, {
                        "key": "delete",
                        "label": "Delete?",
                        "helpText": "Optionally delete any value stored. If true, any passed in `value` attribute will be ignored.",
                        "type": "boolean"
                    }]
                }, {
                    "key": "unsubscribe",
                    "label": "Unsubscribe?",
                    "helpText": "Optional parameter to unsubscribe the subscriber. If they are a premium subscription, this will also end their billing.",
                    "type": "boolean"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'put',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/subscriptions/${bundle.inputData.subscriptionId}`,
                        data: {
                            "unsubscribe": bundle.inputData["unsubscribe"],
                            "custom_fields": [bundle.inputData["custom_field"]]
                        }
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "subscriptionId": "sub_00000000-0000-0000-0000-000000000000",
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "custom_field": {
                        "name": "First Name",
                        "value": "Bruce"
                    }
                }
            }
        },
        "PublicationsPublicationIdSegmentsSegmentIddelete": {
            "key": "PublicationsPublicationIdSegmentsSegmentIddelete",
            "noun": "Segments",
            "display": {
                "label": "Delete a Segment",
                "description": "Deletes a particular segment."
            },
            "operation": {
                "inputFields": [{
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "segmentId",
                    "label": "Segment ID",
                    "helpText": "The prefixed ID of the segment object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'delete',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/segments/${bundle.inputData.segmentId}`,
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "segmentId": "seg_00000000-0000-0000-0000-000000000000"
                }
            }
        }
    },
    "searches": {
        "Publicationsget": {
            "key": "Publicationsget",
            "noun": "Publications",
            "display": {
                "label": "List All Publications",
                "description": "Returns a list of publications with their publication IDs."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the publication(s)",
                    "type": "string",
                    "list": true
                }, {
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"],
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats"],
                    "limit": 10,
                    "page": 1
                }
            }
        },
        "PublicationsPublicationIdget": {
            "key": "PublicationsPublicationIdget",
            "noun": "Publications",
            "display": {
                "label": "Views the details of a single publication",
                "description": "Retrieve a single publication"
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the publication(s)",
                    "type": "string",
                    "list": true
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats"],
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdPostsget": {
            "key": "PublicationsPublicationIdPostsget",
            "noun": "Posts",
            "display": {
                "label": "List All Posts",
                "description": "Returns a list of posts for a particular publication."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the post(s)<br> `free_web_content` - Returns the web HTML rendered to a free reader<br> `free_email_content` - Returns the email HTML rendered to a free reader<br> `free_rss_content` - Returns the RSS feed HTML<br> `premium_web_content` - Returns the web HTML rendered to a premium reader<br> `premium_email_content` - Returns the email HTML rendered to a premium reader",
                    "type": "string",
                    "list": true
                }, {
                    "key": "audience",
                    "label": "Audience",
                    "helpText": "Optionally filter the results by audience",
                    "type": "string"
                }, {
                    "key": "platform",
                    "label": "Platform",
                    "helpText": "Optionally filter the results by platform.<br>`web` - Posts only published to web.<br>`email` - Posts only published to email.<br>`both` - Posts published to email and web.<br>`all` - Does not restrict results by platform.",
                    "type": "string"
                }, {
                    "key": "status",
                    "label": "Status",
                    "helpText": "Optionally filter the results by the status of the post.<br>`draft` - not been scheduled.<br>`confirmed` - The post will be active after the `scheduled_at`.<br>`archived` - The post is no longer active.<br>`all` - Does not restrict results by status.",
                    "type": "string"
                }, {
                    "key": "content_tags[]",
                    "label": "Content Tags:",
                    "helpText": "Optionally filter posts by content_tags. Adding a content tag will return any post with that content tag associated to it.<br>Example: Filtering for `content_tags: [\"sales\",\"closing\"]` will return results of posts that have *either* sales or closing content_tags.",
                    "type": "string",
                    "list": true
                }, {
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/posts`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"],
                            "audience": bundle.inputData["audience"],
                            "platform": bundle.inputData["platform"],
                            "status": bundle.inputData["status"],
                            "content_tags[]": bundle.inputData["content_tags[]"],
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats", "free_web_content"],
                    "audience": "all",
                    "platform": "all",
                    "status": "all",
                    "limit": 10,
                    "page": 1,
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdPostsPostIdget": {
            "key": "PublicationsPublicationIdPostsPostIdget",
            "noun": "Posts",
            "display": {
                "label": "View a Post",
                "description": "View the details of a single post."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the post(s)<br> `free_web_content` - Returns the web HTML rendered to a free reader<br> `free_email_content` - Returns the email HTML rendered to a free reader<br> `free_rss_content` - Returns the RSS feed HTML<br> `premium_web_content` - Returns the web HTML rendered to a premium reader<br> `premium_email_content` - Returns the email HTML rendered to a premium reader",
                    "type": "string",
                    "list": true
                }, {
                    "key": "postId",
                    "label": "Post ID",
                    "helpText": "The prefixed ID of the post object",
                    "type": "string"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/posts/${bundle.inputData.postId}`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats", "free_web_content"],
                    "postId": "post_00000000-0000-0000-0000-000000000000",
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSubscriptionsget": {
            "key": "PublicationsPublicationIdSubscriptionsget",
            "noun": "Subscriptions",
            "display": {
                "label": "List All Subscribers",
                "description": "Retrieve all subscriptions belonging to a specific publication.",
                "important": true
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the subscription(s).<br>`custom_fields` - Returns an array of custom field values that have been set on the subscription.<br>`referrals` - Returns an array of subscriptions with limited data - `id`, `email`, and `status`. These are the subscriptions that were referred by this subscription.",
                    "type": "string",
                    "list": true
                }, {
                    "key": "status",
                    "label": "Status",
                    "helpText": "Optionally filter the results by a status",
                    "type": "string"
                }, {
                    "key": "tier",
                    "label": "Tier",
                    "helpText": "Optionally filter the results by a their tier",
                    "type": "string"
                }, {
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "email",
                    "label": "Email",
                    "helpText": "Optional email address to find a subscription.<br>This param must be an exact match and is case insensitive.",
                    "type": "string"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/subscriptions`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"],
                            "status": bundle.inputData["status"],
                            "tier": bundle.inputData["tier"],
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"],
                            "email": bundle.inputData["email"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats", "custom_fields"],
                    "status": "all",
                    "tier": "all",
                    "limit": 10,
                    "page": 1,
                    "email": "clark@dailyplanet.com",
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSubscriptionsSubscriptionIdget": {
            "key": "PublicationsPublicationIdSubscriptionsSubscriptionIdget",
            "noun": "Subscriptions",
            "display": {
                "label": "View a Subscriber",
                "description": "Shows the details of a single subscriber."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the subscription(s).<br>`custom_fields` - Returns an array of custom field values that have been set on the subscription.<br>`referrals` - Returns an array of subscriptions with limited data - `id`, `email`, and `status`. These are the subscriptions that were referred by this subscription.",
                    "type": "string",
                    "list": true
                }, {
                    "key": "subscriptionId",
                    "label": "Subscription ID",
                    "helpText": "The prefixed ID of the subscription object",
                    "type": "string"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/subscriptions/${bundle.inputData.subscriptionId}`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats", "custom_fields"],
                    "subscriptionId": "sub_00000000-0000-0000-0000-000000000000",
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSegmentsget": {
            "key": "PublicationsPublicationIdSegmentsget",
            "noun": "Segments",
            "display": {
                "label": "List All Segments",
                "description": "Return a list of segments from a publication."
            },
            "operation": {
                "inputFields": [{
                    "key": "type",
                    "label": "Type",
                    "helpText": "Optionally filter the results by the segment's type.",
                    "type": "string"
                }, {
                    "key": "status",
                    "label": "Status",
                    "helpText": "Optionally filter the results by the segment's status.",
                    "type": "string"
                }, {
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/segments`,
                        params: {
                            "type": bundle.inputData["type"],
                            "status": bundle.inputData["status"],
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "type": "dynamic",
                    "status": "completed",
                    "limit": 10,
                    "page": 1,
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSegmentsSegmentIdget": {
            "key": "PublicationsPublicationIdSegmentsSegmentIdget",
            "noun": "Segments",
            "display": {
                "label": "View a Segment",
                "description": "Shows the details of a single segment."
            },
            "operation": {
                "inputFields": [{
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "segmentId",
                    "label": "Segment ID",
                    "helpText": "The prefixed ID of the segment object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/segments/${bundle.inputData.segmentId}`,
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "segmentId": "seg_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdSegmentsSegmentIdResultsget": {
            "key": "PublicationsPublicationIdSegmentsSegmentIdResultsget",
            "noun": "Segments",
            "display": {
                "label": "Expand Results",
                "description": "List the Subscriber Ids from the most recent calculation of a specific publication."
            },
            "operation": {
                "inputFields": [{
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "segmentId",
                    "label": "Segment ID",
                    "helpText": "The prefixed ID of the segment object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/segments/${bundle.inputData.segmentId}/results`,
                        params: {
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "limit": 10,
                    "page": 1,
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "segmentId": "seg_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdEmailBlastsget": {
            "key": "PublicationsPublicationIdEmailBlastsget",
            "noun": "Email Blasts",
            "display": {
                "label": "List All Email Blasts",
                "description": "Returns a list of email blasts."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the email blast(s)<br> `free_email_content` - Returns the email HTML rendered to a free reader<br> `premium_email_content` - Returns the email HTML rendered to a premium reader",
                    "type": "string",
                    "list": true
                }, {
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/email_blasts`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"],
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats"],
                    "limit": 10,
                    "page": 1,
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdEmailBlastsEmailBlastIdget": {
            "key": "PublicationsPublicationIdEmailBlastsEmailBlastIdget",
            "noun": "Email Blasts",
            "display": {
                "label": "View an Email Blast",
                "description": "Views the details of a single email blast."
            },
            "operation": {
                "inputFields": [{
                    "key": "expand[]",
                    "label": "Expand:",
                    "helpText": "Optional list of expandable objects.<br>`stats` - Returns statistics about the email blast(s)<br> `free_email_content` - Returns the email HTML rendered to a free reader<br> `premium_email_content` - Returns the email HTML rendered to a premium reader",
                    "type": "string",
                    "list": true
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }, {
                    "key": "emailBlastId",
                    "label": "Email Blast ID",
                    "helpText": "The prefixed ID of the email blast object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/email_blasts/${bundle.inputData.emailBlastId}`,
                        params: {
                            "expand[]": bundle.inputData["expand[]"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "expand[]": ["stats"],
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000",
                    "emailBlastId": "blast_00000000-0000-0000-0000-000000000000"
                }
            }
        },
        "PublicationsPublicationIdReferralProgramget": {
            "key": "PublicationsPublicationIdReferralProgramget",
            "noun": "Referral Program",
            "display": {
                "label": "View Referral Program",
                "description": "Retrieve details about the publication's referral program, including milestones and rewards."
            },
            "operation": {
                "inputFields": [{
                    "key": "limit",
                    "label": "Limit",
                    "helpText": "A limit on the number of objects to be returned. The limit can range between 1 and 100, and the default is 10.",
                    "type": "integer"
                }, {
                    "key": "page",
                    "label": "Page",
                    "helpText": "Pagination returns the results in pages. Each page contains the number of results specified by the `limit` (default: 10).<br>If not specified, results 1-10 from page 1 will be returned.",
                    "type": "integer"
                }, {
                    "key": "publicationId",
                     "label": "Publication ID",
                    "helpText": "The prefixed ID of the publication object",
                    "type": "string"
                }],
                "perform": (z, bundle) => {
                    var responsePromise = z.request({
                        method: 'get',
                        url: `https://api.beehiiv.com/v2/publications/${bundle.inputData.publicationId}/referral_program`,
                        params: {
                            "limit": bundle.inputData["limit"],
                            "page": bundle.inputData["page"]
                        },
                    });
                    return responsePromise.then(response => JSON.parse(response.content));
                },
                "sample": {
                    "limit": 10,
                    "page": 1,
                    "publicationId": "pub_00000000-0000-0000-0000-000000000000"
                }
            }
        }
    }
};

module.exports = App;