
angular.module('ngCordova', [
  'ngCordova.plugins'
]);
angular.module('ngCordova.plugins.camera', [])

.factory('$cordovaCamera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      if(!navigator.camera) {
        q.resolve(null);
        return q.promise;
      }

      navigator.camera.getPicture(function(imageData) {
        q.resolve(imageData);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    cleanup: function(options) {
      var q = $q.defer();

      navigator.camera.cleanup(function() {
        q.resolve(arguments);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
    
  }
}]);
angular.module('ngCordova.plugins.device', [])

.factory('$cordovaDevice', [function () {

  return {
    getDevice: function () {
      return device;
    },

    getCordova: function () {
      return device.cordova;
    },

    getModel: function () {
      return device.model;
    },

    // Waraning: device.name is deprecated as of version 2.3.0. Use device.model instead.
    getName: function () {
      return device.name;
    },

    getPlatform: function () {
      return device.platform;
    },

    getUUID: function () {
      return device.uuid;
    },

    getVersion: function () {
      return device.version;
    }
  }
}]);
angular.module('ngCordova.plugins.keyboard', [])

.factory('$cordovaKeyboard', [function () {

  return {
    hideAccessoryBar: function (bool) {
      return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
    },

    close: function () {
      return cordova.plugins.Keyboard.close();
    },

    disableScroll: function (bool) {
      return cordova.plugins.Keyboard.disableScroll(bool);
    },

    isVisible: function () {
      return cordova.plugins.Keyboard.isVisible
    }

    //TODO: add support for native.keyboardshow + native.keyboardhide
  }
}]);
angular.module('ngCordova.plugins.push', [])

.factory('$cordovaPush', ['$q', function ($q) {
    return {
        register: function (config) {
            var q = $q.defer();
            window.plugins.pushNotification.register(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            config);
            
            return q.promise;
        },
        
        unregister: function (options) {
            var q = $q.defer();
            window.plugins.pushNotification.unregister(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            options);
            
            return q.promise;
        },
        
        // iOS only
        setBadgeNumber: function(number) {
        	var q = $q.defer();
            window.plugins.pushNotification.setApplicationIconBadgeNumber(
            function (result) {
                q.resolve(result);
            },
            function (error) {
                q.reject(error);
            },
            number);
            return q.promise;
        }
    };
}]);angular.module('ngCordova.plugins.vibration', [])

.factory('$cordovaVibration', [function() {

  return {
  	vibrate: function(times) {
  	  return navigator.notification.vibrate(times);
	  },
    vibrateWithPattern: function(pattern, repeat) {
      return navigator.notification.vibrateWithPattern(pattern, repeat);
    },
    cancelVibration: function() {
      return navigator.notification.cancelVibration();
    }
  }
}]);
angular.module('ngCordova.plugins.geolocation', [])

.factory('$cordovaGeolocation', ['$q', function($q) {

  return {
    getCurrentPosition: function(options) {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    watchPosition: function(options) {
      var q = $q.defer();

      var watchId = navigator.geolocation.watchPosition(function(result) {
        // Do any magic you need
        q.notify(result);

      }, function(err) {
        q.reject(err);
      }, options);

      return {
        watchId: watchId,
        promise: q.promise
      }
    },

    clearWatch: function(watchID) {
      return navigator.geolocation.clearWatch(watchID);
    }
  }
}]);
// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// NOTE: shareViaEmail -> TO, CC, BCC must be an array, Files can be either null, string or array
// TODO: add support for iPad
// TODO: detailed docs for each social sharing types (each social platform has different requirements)

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', function ($q) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.share(message, subject, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaTwitter(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaWhatsApp(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaFacebook(message, file, link,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr,
          function () {
            q.resolve(true); // success
          },
          function () {
            q.reject(false); // error
          });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        window.plugins.socialsharing.canShareViaEmail(
            function () {
              q.resolve(true); // success
            },
            function () {
              q.reject(false); // error
            });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.canShareVia(via, message, subject, file, link,
          function (success) {
            q.resolve(success); // success
          },
          function (error) {
            q.reject(error); // error
          });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        window.plugins.socialsharing.shareVia(via, message, subject, file, link,
            function () {
              q.resolve(true); // success
            },
            function () {
              q.reject(false); // error
            });
        return q.promise;
      }

    }
  }]);
angular.module('ngCordova.plugins.contacts', [])

.factory('$cordovaContacts', ['$q', function ($q) {

  return {
    save: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.save(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    remove: function (contact) {
      var q = $q.defer();
      var deviceContact = navigator.contacts.create(contact);

      deviceContact.remove(function (result) {
          q.resolve(result);
        },
        function (err) {
          q.reject(err);
        });
      return q.promise;
    },

    clone: function (contact) {
      var deviceContact = navigator.contacts.create(contact);
      return deviceContact.clone(contact)
    },

    find: function (options) {
      var q = $q.defer();
      var fields = options.fields || ['id', 'displayName'];
      delete options.fields;

      navigator.contacts.find(fields, function (results) {
          q.resolve(results);
        },
        function (err) {
          q.reject(err);
        },
        options);

      return q.promise;
    }

    /*
     getContact: function (contact) {
     var q = $q.defer();

     navigator.contacts.pickContact(function (contact) {

     })

     }
     */

    // TODO: method to set / get ContactAddress
    // TODO: method to set / get ContactError
    // TODO: method to set / get ContactField
    // TODO: method to set / get ContactName
    // TODO: method to set / get ContactOrganization

  }

}]);
// TODO: add support for readFile -> readAsData
// TODO: add support for readFile -> readAsBinaryString
// TODO: add support for readFile -> readAsArrayBuffer
// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types
// TODO: add abort() option to downloadFile and uploadFile methods.
// TODO: add support for downloadFile and uploadFile options. (or detailed documentation) -> for fileKey, fileName, mimeType, headers
// TODO: add support for onprogress property


angular.module('ngCordova.plugins.file', [])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readFile)
  .factory('$cordovaFile', ['$q', function ($q) {

    return {
      checkDir: function (dir) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: false},
              //Dir exists
              function () {
                q.resolve();
              },
              //Dir doesn't exist
              function () {
                q.reject();
              }
            );
          }
        );

        return q.promise;
      },

      createDir: function (dir, replaceBOOL) {
        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getDirectory(dir, {create: true, exclusive: replaceBOOL});
          }
        );
      },

      checkFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
            filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // File exists
              function () {
                q.resolve();
              },
              // File doesn't exist
              function () {
                q.reject();
              }
            );
          }
        );

        return q.promise;
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(dir, file, replaceBOOL)
        if (arguments.length == 3) {
            filePath = '/' + filePath + '/' + arguments[1];
            replaceBOOL = arguments[2];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true, exclusive: replaceBOOL},
              function (success) {

              },
              function (err) {

              });
          }
        );
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
            filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false}, function (fileEntry) {
              fileEntry.remove(function () {
                q.resolve();
              });
            });
          }
        );

        return q.promise;
      },

      writeFile: function (filePath, data) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: true},
              function (fileEntry) {
                fileEntry.createWriter(
                  function (fileWriter) {
                    fileWriter.onwriteend = function(evt) {
                      q.resolve(evt);
                    }
                    fileWriter.write(data);
                  },
                  function (error) {
                    q.reject(error);
                  });
              }
            );
          }
        );

        return q.promise;
      },

      readFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
            filePath = '/' + filePath + '/' + arguments[1];
        }

        getFilesystem().then(
          function (filesystem) {

            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    q.resolve(this.result);
                  };

                  reader.readAsText(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        var q = $q.defer();

        getFilesystem().then(
          function (filesystem) {
            filesystem.root.getFile(filePath, {create: false},
              // success
              function (fileEntry) {
                fileEntry.file(function (file) {
                  q.resolve(file);
                });
              },
              // error
              function (error) {
                q.reject(error);
              });
          }
        );

        return q.promise;
      },

      downloadFile: function (source, filePath, trustAllHosts, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(source);
        
        fileTransfer.onprogress = function(progressEvent) {
            q.notify(progressEvent);
        };

        fileTransfer.download(
          uri,
          filePath,
          function (entry) {
            q.resolve(entry);
          },
          function (error) {
            q.reject(error);
          },
          trustAllHosts, options);
          
          return q.promise;
      },

      uploadFile: function (server, filePath, options) {
        var q = $q.defer();
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(server);
        
        fileTransfer.onprogress = function(progressEvent) {
            q.notify(progressEvent);
        };

        fileTransfer.upload(
          filePath,
          uri,
          function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          options)
          
          return q.promise
      }

    };

    function getFilesystem() {
      var q = $q.defer();

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (filesystem) {
          q.resolve(filesystem);
        },
        function (err) {
          q.reject(err);
        });

      return q.promise;
    }
  }]);angular.module('ngCordova.plugins.dialogs', [])

.factory('$cordovaDialogs', [function() {

  return {
    alert: function(message, callback, title, buttonName) {
	    return navigator.notification.alert.apply(navigator.notification, arguments);
    },

    confirm: function(message, callback, title, buttonName) {
	    return navigator.notification.confirm.apply(navigator.notification, arguments);
    },

    prompt: function(message, promptCallback, title, buttonLabels, defaultText) {
	    return navigator.notification.prompt.apply(navigator.notification, arguments);
    },

    beep: function(times) {
	    return navigator.notification.beep(times);
    }
  }
}]);
angular.module('ngCordova.plugins.localNotification', [])

.factory('$cordovaLocalNotification', ['$q',
    function ($q) {

        return {
            add: function (options, scope) {
                var q = $q.defer();
                window.plugin.notification.local.add(
                    options,
                    function (result) {
                        q.resolve(result);
                    },
                    scope);
                return q.promise;
            },

            cancel: function (id, scope) {
                var q = $q.defer();
                window.plugin.notification.local.cancel(
                    id, function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            cancelAll: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.cancelAll(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            isScheduled: function (id, scope) {
                var q = $q.defer();

                window.plugin.notification.local.isScheduled(
                    id,
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getScheduledIds: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.getScheduledIds(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            isTriggered: function (id, scope) {
                var q = $q.defer();

                window.plugin.notification.local.isTriggered(
                    id, function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getTriggeredIds: function (scope) {
                var q = $q.defer();

                window.plugin.notification.local.getTriggeredIds(
                    function (result) {
                        q.resolve(result);
                    }, scope);

                return q.promise;
            },

            getDefaults: function () {
                return window.plugin.notification.local.getDefaults();
            },

            setDefaults: function (Object) {
                window.plugin.notification.local.setDefaults(Object);
            },

            onadd: function () {
                return window.plugin.notification.local.onadd;
            },

            ontrigger: function () {
                return window.plugin.notification.local.ontrigger;
            },

            onclick: function () {
                return window.plugin.notification.local.onclick;
            },

            oncancel: function () {
                return window.plugin.notification.local.oncancel;
            }
        }
    }
]);