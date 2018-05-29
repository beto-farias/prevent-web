<?php
/**
 * Estilos basicos con el cual iniciara nuestra vista
 *  
 */
?>
	<!-- Favicon -->
    <link rel="apple-touch-icon" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/images/apple-touch-icon.png">
    <link rel="shortcut icon" href="<?php echo Yii::app()->request->baseUrl; ?>/images/logos/favicon.png">
    
	<!-- Stylesheets -->
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/css/bootstrap-extend.min.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/css/site.min.css">

    <!-- Plugins -->
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/animsition/animsition.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/asscrollable/asScrollable.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/switchery/switchery.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/intro-js/introjs.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/slidepanel/slidePanel.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/vendor/flag-icon-css/flag-icon.css">

    <!-- Fonts -->
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/fonts/web-icons/web-icons.min.css">
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/fonts/brand-icons/brand-icons.min.css">
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
    
    <!-- Page -->
    <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/assets/fonts/ionicons/ionicons.css">
	
	<!-- Title -->
    <title><?php echo CHtml::encode($this->title); ?></title>

	<link rel="stylesheet" href="<?= Yii::app()->request->baseUrl."/css/prevente.css" ?>">

	<!--[if lt IE 9]>
	<script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/html5shiv/html5shiv.min.js"></script>
	<![endif]-->

	<!--[if lt IE 10]>
	<script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/media-match/media.match.min.js"></script>
	<script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/respond/respond.min.js"></script>
	<![endif]-->

	<!-- Scripts -->
	<script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/modernizr/modernizr.js"></script>
		
	<script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/breakpoints/breakpoints.js"></script>
		
	<script>
	Breakpoints();
	</script>
