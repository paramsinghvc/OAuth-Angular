define(['config'], function(config) {
    return ['ajax', 'api', '$location', 'auth',
        function(ajax, api, $location, auth) {


            return {

                apiKey: 'AIzaSyA1XzuSgPUM17ekhzg5aSbuxOLN7ZKgDVk',
                clientId: '911843811371-s99dpi5cp3blg0h26b50oacbfiubi8qc.apps.googleusercontent.com',
                scopes: 'https://www.googleapis.com/auth/plus.me profile email',

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
                    localStorage.setItem('currentOauthProvider', 'google');
                    // this.checkForTokenParam();
                    if (navigator.userAgent.match('CriOS')) {

                        top.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=' +
                            self.clientId + '&redirect_uri=' + document.location.href +
                            '&response_type=token&scope=' + self.scopes;

                    } else {


                        function handleClientLoad() {
                            gapi.client.setApiKey(self.apiKey);
                            window.setTimeout(checkAuth, 1);
                        }

                        function checkAuth() {
                            gapi.auth.authorize({
                                client_id: self.clientId,
                                scope: self.scopes,
                                immediate: true
                            }, handleAuthResult);
                        }

                        function handleAuthResult(authResult) {

                            self.postAccessToken(authResult.access_token);

                        }

                        handleClientLoad();
                        gapi.auth.authorize({
                            client_id: self.clientId,
                            scope: self.scopes,
                            immediate: false
                        }, handleAuthResult);                        

                    }
                },
                postAccessToken: function(accessToken) {
                    ajax({
                            type: 'POST',
                            url: config.authBase + '/login',
                            data: {
                                oauth_provider: 'google',
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
