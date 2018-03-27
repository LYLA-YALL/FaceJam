require=(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"/../node_modules/describe/describe.js":[function(require,module,exports){
(function (process){
(function(scope) {

	var isModule = false;

	// Export with CommonJS
	if (typeof module !== 'undefined' && typeof require !== 'undefined') {
		isModule = true;
	}

	var options = {
		timeout: 500,
		callbackMode: false
	};

	function outputDOM(data) {
		String.prototype.color = function(color) {
			return '<span style="color:'+color+
			       ';font-weight:bold;">'+this+"</span>";
		};
		document.body.innerHTML = "<pre>"+getOutput(data)+"</pre>";
	}

	function outputConsole(data, options) {

		require('string-color');

		console.log(getOutput(data));

		process.exit(data.total-data.passed);

	}

	function getOutput(data) {

		var output = "";

		for (var k in data.errors) {
			output += k.color('red')+"\n";
			output += (data.errors[k].stack || data.errors[k])+"\n";
		}

		if (data.passed!==data.total) output += "FAILED".color('red');
		else output += "PASSED".color('green');
		output += ": "+data.passed+"/"+data.total;

		return output;

	}

	function expect(subject, expected, callback, options) {
		if (subject && subject.then && options.callbackMode == "promises") {
			subject.then(function(data) {
				expect(data, expected, callback, options);
			}, callback);
		}
		if (expected===undefined) {
			expected = subject;
			subject  = null;
			return function(response,data) {
				if (options.callbackMode=='node') {
					if (response) {
						return callback(response);
					} else response = data;
				}
				expect(response, expected, callback);
			};
		}  else {
			if (subject&&subject.message) callback(subject);
			else if (subject==expected||options.getError) callback(null);
			else callback(new Error("Expected "+expected+" but got "+subject));
		}
	}

	function runTest(fun, callback, options) {

		var done, timer, errorExpected;

		function respond(e) {
			if (done) return;
			done = true;
			if (errorExpected) {
				e = e.message || e;
				if (e && errorExpected == e) {
					e = null;
				} else {
					e = new Error("Expected error '"+errorExpected+"' but got "+e);
				}
			}
			callback(e);
			clearTimeout(timer);
		}

		try {
			fun.call({
				expect: function(a,b) {
					return expect(a,b,respond,options);
				},
				expectError: function(a,b) {
					options.getError = true;
					errorExpected = b || a;
					return expect(a, b, respond, options);
				}
			});
		} catch (e) {
			respond(e);
			clearTimeout(timer);
		}

		var error = new Error("Test timeout after "+options.timeout+"ms");
		timer = setTimeout(function() {
			respond(error);
		}, options.timeout);

	}

	function Group(name, tests, config) {
		this.options = {};
		for (var k in options) this.options[k] = options[k];
		for (k in config) this.options[k] = config[k];
		this.tests = tests;
	}

	Group.prototype.execute = function(callback) {

		var pending = 0, results = {}, my = this, errors = {},
		    total   = 0, passed = 0,
		    hooks   = {beforeEach:0, beforeAll:0, afterEach:0, afterAll:0};

		for (var name in this.tests) {
			if (hooks[name]!==undefined) hooks[name] = this.tests[name];
			else if (this.tests.hasOwnProperty(name)) pending++;
		}

		if (hooks.beforeAll) hooks.beforeAll();
		for (name in this.tests) {
			if (hooks[name]!==undefined) continue;
			if (this.tests.hasOwnProperty(name)) (function(name){
				if (hooks.beforeEach) hooks.beforeEach();
				var returned = false;
				total++;
				runTest(my.tests[name], function(error) {
					if (returned) {
						results[name] = new Error("Duplicate callback");
						return;
					}
					returned = true;
					pending--;
					results[name] = error;
					if (error === null) passed++;
					else {
						errors[name] = error;
					}
					if (pending===0) {
						callback({
							total: total,
							passed: passed,
							results: results,
							errors: errors
						});
					}
				}, my.options);
			}(name));
			if (hooks.afterEach) hooks.afterEach();
		}
		if (hooks.afterAll) hooks.afterAll();

	};

	var results = {}, pendingGroups = 0, resultCallbacks = [];

	results.total   = 0;
	results.passed  = 0;
	results.errors  = {};
	results.results = {};

	function describe(name, tests, config) {
		pendingGroups++;
		new Group(name, tests, config).execute(function(data) {
			results.results[name] = data;
			results.total  += data.total;
			results.passed += data.passed;
			for (var k in data.errors) {
				results.errors[name+'#'+k] = data.errors[k];
			}
			pendingGroups--;
			if (pendingGroups===0) {
				var next = resultCallbacks.shift();
				while (next) {
					next(results);
					next = resultCallbacks.shift();
				}
			}
		});
	}

	describe.config = function(k,v) {
		if (v) options[k] = v;
		return options[k] || false;
	};

	describe.getResults = function(cb) {
		if (pendingGroups===0) cb(results);
		else resultCallbacks[resultCallbacks.length] = cb;
	};

	describe.logResults = function() {
		describe.getResults(function(data) {
			if (typeof window !== "undefined") outputDOM(data, options);
			else outputConsole(data, options);
		});
	};

	if (isModule) module.exports = describe;
	else scope.describe = describe;

}(this));
}).call(this,require('_process'))
},{"_process":1,"string-color":2}],1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
String.prototype.color = function() {
	if (!arguments) return this;
	var colors;
	if (arguments.length==1 && typeof(colors)=="string") colors = [arguments[i]];
	colors = arguments;
	var code = '';
	for (var i = 0;i<colors.length;i++) code+=ANSI.get(colors[i]);
	return code+this+ANSI.get('reset');
};

//ANSI color and style codes.
var ANSI = {

	'prefix'    : "\u001B[",
	'suffix'    : "m",

	//Styles
	
	'reset'     :  0,
	'bold'      :  1,
	'/bold'     : 22,
	'italic'    :  3,
	'/italic'   : 23,
	'underline' :  4,
	'/underline': 24,
	'conceal'   :  8,
	'strike'    :  9,
	'/strike'   : 29,
	'reverse'   :  7,
	'blink'     :  5,
	'blink2'    :  6,
	
	//Colors
	
	'black'     : 30,
	'red'       : 31,
	'green'     : 32,
	'yellow'    : 33,
	'blue'      : 34,
	'purple'    : 35,
	'cyan'      : 36,
	'white'     : 37,
	'default'   : 39,

	//Backgrounds

	'bgblack'   : 40,
	'bgred'     : 41,
	'bggreen'   : 42,
	'bgyellow'  : 43,
	'bgblue'    : 44,
	'bgpurple'  : 45,
	'bgcyan'    : 46,
	'bgwhite'   : 47,
	'bgdefault' : 49,

	'get': function(color) {
		code = this[color];
		if (code===false) return 0;
		return this.prefix+code+this.suffix;
	}

};

exports.test = function() {
	var supported = [];
	for (code in ANSI) {
		if (!ANSI.hasOwnProperty(code)) continue;
		if (code.match(/\W/)) continue;
		if (typeof(ANSI[code])!="number") continue;
		supported[supported.length] = code;
	}
	str = "Supported color codes are: ";
	for (var i = 0;i<supported.length;i++) {
		str += supported[i].color(supported[i])+' ';
	}
	console.log(str);
};

},{}]},{},[]);
