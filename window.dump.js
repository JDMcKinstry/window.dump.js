/**	dump(varried)
 *	Simple method for ensuring easy to read information in the console.
 **/
;(function() {
	function realType(toLower) {
		var r = typeof this;
		try {
			if (window.hasOwnProperty('jQuery') && this.constructor && this.constructor == jQuery) r = 'jQuery';
			else r = this.constructor && this.constructor.name ? this.constructor.name : Object.prototype.toString.call(this).slice(8, -1);
		}
		catch(e) { if (this['toString']) r = this.toString().slice(8, -1); }
		return !toLower ? r : r.toLowerCase();
	}
	
	function logArgs() {
		var args = Array.prototype.slice.call(arguments, 0);
		for (var i=0;i<args.length;i++) {
			var rt = realType.apply(args[i]),
				color = function() {
					switch (rt) {
						case 'Array': return 'color: blue;';
						case 'Boolean': return 'color: orange;';
						case 'jQuery': return 'color: green;';
						case 'Number': return 'color: red;';
						case 'Object': return 'color: cyan;';
						case 'String': return 'color: brown;';
					}
					return 'color: grey;';
				}(),
				tab = rt.length<7?"\t\t":"\t";
			console.log("\t%c" + rt, color, tab, args[i]);
		}
	}
	
	function dump() {
		var line50 = Array(50).join('-'),
			strBegin = ' >' + line50 + '={ BEGIN DUMP }=' + line50 + '< ',
			strEnd = ' >' + line50 + '={  END  DUMP }=' + line50 + '< ',
			styles = [
				'background: linear-gradient(to bottom, #9dd53a 0%,#a1d54f 50%,#80c217 51%,#7cbc0a 100%)'
				, 'border: 1px solid #b8c6df'
				, 'color: black'
				, 'display: block'
				, 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
				, 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
				, 'line-height: 20px'
				, 'text-align: center'
				, 'font-weight: bold'
			].join(';');
		console.log('%c' + strBegin, styles);
		logArgs.apply(this, arguments);
		console.log('%c' + strEnd, styles);
	}
	
	//	add as global variable
	window.hasOwnProperty("dump")||(window.dump=dump);
})();
