/* globals $ */
var app = app || {};

(function() {
    "use strict";

    function makeRequest(method, url, data) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                data: data ? data : null,
                method,
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            });
        });

        return promise;
    }

    function makeRequestWithFile(method, url, data) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                async: true,
                url,
                type: "POST",
                data,
                contentType: false,
                cache: false,
                processData: false,
                success(response) {
                    resolve(response);
                },
                error(error) {
                    reject(error);
                }
            });
        });
        return promise;
    }

    class Requester {
        get(url) {
            return makeRequest("GET", url);
        }

        post(url, data) {
            return makeRequest("POST", url, data);
        }

        postWithFile(url, data) {
            return makeRequestWithFile("POST", url, data);
        }
        
        put(url, data) {
            return makeRequest("PUT", url, data);
        }

        delete(url) {
            return makeRequest("DELETE", url);
        }
    }

    app.requester = new Requester();
}());