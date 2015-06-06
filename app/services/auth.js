define(
    ['../config'],
    function(config) {
        return [
            '$rootScope', 'ajax', '$location',
            function($rootScope, ajax, $location) {
               
                return {
                    check: function() {
                        return ajax({
                            type: 'GET',
                            url: config.authBase + '/account'
                        })
                    },

                    storeSessionKey: function(res) {
                        localStorage.setItem('sessionKey', res.xhr.getResponseHeader(config.apiKey));
                        // this.postLoginTest();
                        this.loadHome();
                    },
                    logout: function() {
                        return ajax({
                            type: 'POST',
                            url: config.authBase + '/logout'
                        }).then(function() {
                            $rootScope.$broadcast('logged-out')
                        });
                    },

                    account: function() {
                        return ajax.get({
                            url: config.authBase + '/account'
                        });
                    },

                    loadHome: function() {
                        window.location.href = '/home';
                    },

                    postLoginTest: function() {
                        var self = this;

                        ajax({
                                type: 'GET',
                                url: config.authBase + '/account',
                                data: {
                                    with: ['city', 'photo', 'industry_member', 'roles']
                                }
                            })
                            .then(function(res) {
                                if (!res.data.resource.industry_member) {
                                    $rootScope.$broadcast('no-member-attached');
                                    self.logout();
                                } else {
                                    localStorage.setItem('professionalId', res.data.resource.industry_member.id);
                                    self.loadHome();
                                }
                            });
                    }
                };
            }
        ]
    }
)
