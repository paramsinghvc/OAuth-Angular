define(['config'], function(config) {
    return ['ajax', 'api', '$location', 'auth',
        function(ajax, api, $location, auth) {


            return {
            
                scopes: 'email',

                windowUri: window.location.href,
                checkUrlForAccessToken: function() {
                    var url = this.windowUri;
                    return url.indexOf('access_token') > -1 ? true : false;
                },
                checkForTokenParam: function() {
                    if (this.checkUrlForAccessToken()) {
                        var uri = this.windowUri;
                        var indexOfHashVar = uri.indexOf("access_token=");
                        var token = uri.substring(indexOfHashVar + 13);
                        if (token.indexOf('&') > -1) {
                            token = token.split('&')[0];
                        }
                        this.postAccessToken(token);
                    }
                },

                initLogin: function() {
                    // iOS Chrome Fix
                    var self = this;

                    localStorage.setItem('currentOauthProvider', 'facebook');

                    if (navigator.userAgent.match('CriOS')) {

                        top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=' +
                            self.getAppId() + '&redirect_uri=' + document.location.href +
                            '&response_type=token&scope=' + self.scopes;

                    } else {
                        FB.getLoginStatus(function(res) {
                            
                            FB.login(function(res) {
                                if (res.status !== 'connected' || !res.authResponse) {


                                } else {
                                    var accessToken = res.authResponse.accessToken;
                                    self.postAccessToken(accessToken);

                                }
                            }, {
                                scope: self.scopes,
                                response_type: 'token'
                            });
                            
                        });

                    }
                },
                postAccessToken: function(accessToken) {
                    ajax({
                            type: 'POST',
                            url: config.authBase + '/login',
                            data: {
                                oauth_provider: 'facebook',
                                oauth_token: accessToken
                            }
                        })
                        .then(function(res) {

                            auth.storeSessionKey(res);

                        }, function(err) {});
                }
            }
        }
    ]
})
