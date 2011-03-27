// skyfish

(function( window ) {
	var paths, pathsToLoad, pathsLoaded, finalCallback, basePath;
	
	var parsePaths = function( paths ) {
		if( typeof paths === 'String' ) {
			return [paths];
		} else if( paths instanceof Array ) {
			return paths;
		} else {
			// TODO : throw error
		}	
	};
	
	var parseSettings = function(settings) {
		if( typeof settings === 'function' ) {
			finalCallback = settings;
		} else {
			finalCallback = settings.complete || function() {};
		}
		basePath = settings.base || './';
	};
	
	var incrementCallback = function() {
		if( ++pathsLoaded === pathsToLoad )
			finalCallback();
	};
	
	var loadScript = function(path) {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.onreadystatechange = function () {
			if (this.readyState == 'complete') 
				incrementCallback();
		};
		script.onload = incrementCallback;
		script.src = basePath + path;
		window.document.body.appendChild(script);
	};
	
	var skyfish = function(submittedPaths, settings) {
		paths = parsePaths(submittedPaths);
		pathsToLoad = paths.length;
		pathsLoaded = 0;
		parseSettings( settings );
		for( var key in paths )
			loadScript( paths[key] );
	};
	
	window.skyfish = skyfish;
})( window );