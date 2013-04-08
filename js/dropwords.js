(function($) {

	$.fn.dropwords = function( args ) {
        // Initialize dropwords for all input elements in jQuery collection
        this.each(function() {
            init.call( this, args );
        });

        return this;
    };
	
	function init( args ) {
	
		var KEY = {
			UP: 38,
			DOWN: 40,
			DEL: 46,
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			//COMMA: 188,
			PAGEUP: 33,
			PAGEDOWN: 34,
			BACKSPACE: 8
		};
	
		var $input = $( this ),

		options = $.extend({
			resBlockSelector: "#variants",
			rowSelector: "ul > li", // Selector for results list elems
			curRowClass: "targeted", // If u press arrows button, choosen list elem get this class
			url: "search.php",  // Handler script path
			valuePostName: "value", // Handler script: $_POST[ 'value' ] — input data
			postAction: "search",
			params: {}, // Params, that u can send with input data
			minChars: 2,
			rowsSelection: true, 
			autoFill: true	// Type chosed info at input
		}, args);
		
		var $resultsBlock = $(options.resBlockSelector).hide();
		
		$input.on("keyup", function( e ){
			for (k in KEY) {
				if( KEY[k] == e.which ) return false;
			};
			var cVal = $input.val();
			if ( cVal.length >= options.minChars ) {
				$.ajax({  
					type: "POST",  
					url: options.url,
					dataType: "json",
					data: "action="+options.postAction+"&"+options.valuePostName+"="+cVal+"&params="+JSON.stringify(options.params),
					success: function( data ){
						$resultsBlock.html( data[ 'result' ] ).show();
					}
				});
			};
			e.preventDefault();
		}).on("keydown", function( e ){
			switch(e.which) {
				case KEY.PAGEUP:
				case KEY.UP:
					e.preventDefault();
					if ( !options.rowsSelection ) return false;
					moveTargetedRow( 'prev' );
				break;
				case KEY.PAGEDOWN:
				case KEY.DOWN:
					e.preventDefault();
					if ( !options.rowsSelection ) return false;
					moveTargetedRow( 'next' );
				break;
				case KEY.ESC:
				case KEY.RETURN:
				case KEY.DEL:
				case KEY.BACKSPACE:
					$resultsBlock.hide();
				break;
			};
		}).on("blur", function( e ){
			setTimeout( function() {$resultsBlock.hide(); }, 100);
		})
		
		$resultsBlock.click(function( e ) {
			if ( !e.button == 0 ) return false;
			var li = target(e);
			$input.val( $(li).html() ).focus();
			$resultsBlock.hide();
		});
		
		function moveTargetedRow( dir ) {
			if ( !$resultsBlock.is(':visible') ) return false;
			var $list = $(options.rowSelector, $resultsBlock);
			var $selected = $list.filter('.'+options.curRowClass);
			if ( $selected.length > 0 ) {
				$selected = $selected.removeClass(options.curRowClass)[ dir ]().addClass(options.curRowClass);
			} else {
				$selected = $list.eq( ( dir=='prev') ? $selected.length-1 : 0 ).addClass(options.curRowClass)
			}
			if ( options.autoFill ) $input.val( $selected.html() );
		};
		
		
	};
	
	// Get target Li element onclick
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}
	
})(jQuery);