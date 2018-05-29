<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">

	<?php
	$this->renderPartial ( "//layouts/basicCss" );
	?>

</head>

<body class="<?=$this->classBody?>"  data-auto-menubar="false">
	<!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
	<?php $this->renderPartial("//layouts/headerMenu")?>
	<?php $this->renderPartial("//layouts/asideMenu")?>
	<!-- Page -->
	<div class="page">
      		<?=$content?>
	</div>
	<!-- End Page -->

	<!-- Footer -->
	<?php
	$this->renderPartial ( "//layouts/footer" );
	?>
	<!-- End Footer -->
	
	
	<?php
	$this->renderPartial ( "//layouts/basicJsScripts" );
	?>
</body>

</html>
