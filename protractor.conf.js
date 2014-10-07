var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
//var path = require('E:/protractor/node_modules/protractor/node_modules/dgeni/node_modules/winston/testhelper/helpers');
exports.config = {
  //seleniumServerJar: null,
  seleniumServerJar: 'C:/nightwatchtest/jar/selenium-server-standalone-2.42.2.jar',
  seleniumPort: null,
  //seleniumArgs: ['-browserTimeout=60'],
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //specs: ['./test/com/thed/zephyr/connect/bvt/AdminBVTs.js'],
	specs: ['./functionaltest/bvt/sample.js'],
 //specs: ['example_spec.js'], 
  
  /*multiCapabilities: [
	//{  'browserName': 'ie'}
  {
    'browserName': 'firefox'}
	],*/
  capabilities: {
          'browserName': 'firefox'
    },
  //baseUrl: 'http://localhost:5050/login.jsp',    
  /*jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },*/
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    //allScriptsTimeout: 50000,
    isVerbose: true
  },
  params: {
    testdata: {
      //url: 'http://localhost:5050/login.jsp',
      url: 'http://localhost:2990/jira/login.jsp',
     /* username: 'vm_admin',
      password: 'password',*/
      username: 'admin',
      password: 'admin',
      pageLoadTimeout : 3000,
      loadTimeout : 1000,
      jiraVersion : 63,
      zfjcloudVersion : 10
    }
  },
  onPrepare: function() {
    //var path = 'E:/protractor';
    global.driver = browser.driver;
    browser.ignoreSynchronization = true;
    global.isAngularSite = function(flag){
    browser.ignoreSynchronization = !flag;};
    require('jasmine-reporters');
     jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: '../../report/screenshots/All Html Reports/screenshots',
         docTitle: 'ZFJ_Connect_Reports',
         takeScreenShotsOnlyForFailedSpecs: true,
         pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
          
            var monthMap = {
              "1": "Jan",
              "2": "Feb",
              "3": "Mar",
              "4": "Apr",
              "5": "May",
              "6": "Jun",
              "7": "Jul",
              "8": "Aug",
              "9": "Sep",
              "10": "Oct",
              "11": "Nov",
              "12": "Dec"
            };

            var currentDate = new Date(),
                currentHoursIn24Hour = currentDate.getHours(),
                currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
                totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900) + 
                                      '-'+ currentTimeInHours+'h-' + currentDate.getMinutes()+'m';

            return path.join(totalDateString,capabilities.caps_.browserName, descriptions.join('-'));
         }
      }));
      jasmine.getEnv().addReporter(new HtmlReporter({
         baseDirectory: '../../report/screenshots/Html_report',
         pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
      // Return '<browser>/<specname>' as path for screenshots:
      // Example: 'firefox/list-should work'.
         return path.join(capabilities.caps_.browserName, descriptions.join('-'));
        }
      }));
      

        /*var capsPromise = browser.getCapabilities();
        capsPromise.then(function(caps){
            var browserName = caps.caps_.browserName.toUpperCase();
            var browserVersion = caps.caps_.version;
            var prePendStr = browserName + "-" + browserVersion + "-";
            jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter("../../report/screenshots/xml Report/protractor_output - ", true, true,prePendStr));
        });
*/
  },

  onComplete: function() {
    // At this point, tests will be done but global objects will still be
    // available.
  },

  
  //onCleanUp: function(exitCode) {},
  onCleanUp: function() {}
  
};