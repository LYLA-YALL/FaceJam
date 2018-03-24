/* some ideas for using underscore...

_.filter(list, predicate, [context]) returns elements that match certain parameters you
set forth after searching through the list

_.reject(list, predicate, [context]) returns values in list without the parameters
being searched for.  Opposite of _.filter()

_.pluck(list, propertyName) extracts a list of whatever value(s) you choose from
multiple objects

_.min(list, [iteratee], [context]) returns minimum value in a list, though non-numbers 
will be ignored - ._max() is the opposite

_.pick(object, *keys) 
Return a copy of the object, filtered to only have values for the whitelisted keys 
(or array of valid keys). Alternatively accepts a predicate indicating which keys to pick.

_.omit(object, *keys) 
Return a copy of the object, filtered to omit the blacklisted keys (or array of keys). 
Alternatively accepts a predicate indicating which keys to omit.




This one might possibly be useful?
	memoize_.memoize(function, [hashFunction]) 
Memoizes a given function by caching the computed result. Useful for speeding up 
slow-running computations. If passed an optional hashFunction, it will be used to 
compute the hash key for storing the result, based on the arguments to the original 
function. The default hashFunction just uses the first argument to the memoized 
function as the key. The cache of memoized values is available as the cache property 
on the returned function.

*/


