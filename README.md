#jQuery Dropwords

DROPWORDS — Jquery plugin for easy autocomplete. Advantages of this plugin are small size, easy install.
CSS file for customatization. Fast integration in your projects.


[![Dropwords example](https://dl.dropboxusercontent.com/s/l77rrkq1cfasuyj/dropwords_plugin.png?dl=1&token_hash=AAEKtAYxCPSl9skDfLWm51JI5ZETsLpecvc75rUXeXrppg)](https://github.com/Furdarius/dropwords)

### Working with Dropwords:

``` html
<!-- Include resources: -->
<link rel="stylesheet" type="text/css" href="css/dropwords.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
<script src="js/dropwords.js" type="text/javascript"></script>

<!-- HTML for dropwords: -->
<div id="variants"></div>
<input type="text" name="test_dropwords" value="" />

<!-- Attach dropwords to input: -->
<script type="text/javascript">
	$('input[name="test_dropwords"]').dropwords({  // Users options:
									resBlockSelector: "#variants",		//  Variants block selector
									url: search.php,		//  Server handler
									minChars: 2
								});
</script>
```

# Options:
	* `resBlockSelector`: Selector for results block
	* `rowSelector`: Selector for results list elems ( Default: "ul > li" )
	* `curRowClass`: If you press arrows button, choosen list elem get this class ( Default: "targeted" )
	* `url`: Handler script path ( Default: "search.php" )
	* `valuePostName`: Handler script: $_POST[ 'value' ] — input data ( Default: "value" )
	* `postAction`: $_POST[ 'action' ] value ( Default: "search" )
	* `params`: Params, that u can send with input data ( Default: {} )
	* `minChars`: Min characters for ajax request ( Default: 2 )
	* `rowsSelection`: Can user use arrow buttons ( Default: true )
	* `autoFill`: Type chosed info at input ( Default: true )
