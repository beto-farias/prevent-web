<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">

<link rel="apple-touch-icon"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/images/apple-touch-icon.png">
<link rel="shortcut icon"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/images/favicon.ico">

<!-- Stylesheets -->
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/bootstrap-extend.min.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/site.min.css">

<!-- Plugins For This Page -->
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asrange/asRange.css">

<!-- Plugins -->
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/animsition/animsition.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscrollable/asScrollable.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/switchery/switchery.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/intro-js/introjs.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/slidepanel/slidePanel.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/flag-icon-css/flag-icon.css">

<!-- Fonts -->
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/fonts/web-icons/web-icons.min.css">
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/fonts/brand-icons/brand-icons.min.css">
<link rel='stylesheet'
	href='//fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
<!-- Inline -->
<link rel="stylesheet"
	href="<?php echo Yii::app()->theme->baseUrl ?>/assets/examples/css/uikit/icon.css">

<!--[if lt IE 9]>
      <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/html5shiv/html5shiv.min.js"></script>
      <![endif]-->

<!--[if lt IE 10]>
      <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/media-match/media.match.min.js"></script>
      <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/respond/respond.min.js"></script>
      <![endif]-->

<!-- Scripts -->
<script
	src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/modernizr/modernizr.js"></script>
<script
	src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/breakpoints/breakpoints.js"></script>
<script>
      Breakpoints();
    </script>


<title><?php echo CHtml::encode($this->title); ?></title>

</head>

<body class="dashboard body-page-full">
	<!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

	<nav
		class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega"
		role="navigation">

		<div class="navbar-header">
			<button type="button"
				class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided"
				data-toggle="menubar">
				<span class="sr-only">Toggle navigation</span> <span
					class="hamburger-bar"></span>
			</button>
			<button type="button" class="navbar-toggle collapsed"
				data-target="#site-navbar-collapse" data-toggle="collapse">
				<i class="icon wb-more-horizontal" aria-hidden="true"></i>
			</button>
			<!--
      <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
        <img class="navbar-brand-logo" src="../../assets/images/logo.png" title="Remark">
        <span class="navbar-brand-text"> Remark</span>
      </div>
      -->
			<!--
      <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-search"
      data-toggle="collapse">
        <span class="sr-only">Toggle Search</span>
        <i class="icon wb-search" aria-hidden="true"></i>
      </button>
      -->
		</div>

		<div class="navbar-container container-fluid">
			<!-- Navbar Collapse -->
			<div class="collapse navbar-collapse navbar-collapse-toolbar"
				id="site-navbar-collapse">
				<!-- Navbar Toolbar Right -->
				<ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
					<li class="dropdown">
          <?php
										
										echo CHtml::link ( ' <span class="name-user">Admin panel</span>
              
                <div class="btn-logout-admin">
                  <span class="icon wb-power" aria-hidden="true"></span>
                </div>', array (
												"site/logout" 
										), array (
												"data-animation" => "scale-up",
												"role" => "button" 
										) )?>
          </li>
				</ul>
				<!-- End Navbar Toolbar Right -->
			</div>
			<!-- End Navbar Collapse -->

			<!-- Site Navbar Seach -->
			<div class="collapse navbar-search-overlap" id="site-navbar-search">
				<form role="search">
					<div class="form-group">
						<div class="input-search">
							<i class="input-search-icon wb-search" aria-hidden="true"></i> <input
								type="text" class="form-control" name="site-search"
								placeholder="Search...">
							<button type="button" class="input-search-close icon wb-close"
								data-target="#site-navbar-search" data-toggle="collapse"
								aria-label="Close"></button>
						</div>
					</div>
				</form>
			</div>
			<!-- End Site Navbar Seach -->
		</div>
	</nav>

	<div class="site-menubar">
		<div class="site-menubar-body">
			<div>
				<div>

					<ul class="site-menu padding-20">
						<!--  <li class="site-menu-category">Menu</li> -->


						<li class="site-menu-item">
                <?php
																
																echo CHtml::link ( '<i class="site-menu-icon wb-stats-bars" aria-hidden="true"></i>
                    <span class="site-menu-title">Overall Progress</span>', array (
																		"index" 
																), array (
																		"class" => "animsition-link" 
																) )?>
                </li>

						<li class="site-menu-item">
                <?php
																echo CHtml::link ( '<i class="site-menu-icon wb-pie-chart" aria-hidden="true"></i>
                    <span class="site-menu-title">Judge Progress</span>', array (
																		"juecesAdmin/judgeProgress" 
																), array (
																		"class" => "animsition-link" 
																) );
																?>
                </li>

						<li class="site-menu-item">
							   <?php
																
echo CHtml::link ( '<i class="site-menu-icon wb-users" aria-hidden="true"></i>
                    <span class="site-menu-title">Competitors</span>', array (
																		"competitors" 
																), array (
																		"class" => "animsition-link" 
																) );
																?>
                </li>

						<li class="site-menu-item">
						<?php echo CHtml::link('<i class="site-menu-icon wb-share" aria-hidden="true"></i>
								<span class="site-menu-title">Finalist</span>', array("juecesAdmin/finalists"), array("class"=>"animsition-link"));?>

						<li class="site-menu-item">
						
						 <?php
																echo CHtml::link ( '<i class="site-menu-icon wb-hammer" aria-hidden="true"></i>
                    <span class="site-menu-title">Category Conflicts</span>', array (
																		"juecesAdmin/conflicts" 
																), array (
																		"class" => "animsition-link" 
																) );
																?>
						
						
						</li>

						<!--
                
                <li class="site-menu-item">
                  <a class="animsition-link" href="eventos.html">
                    <i class="icon md-assignment-check" aria-hidden="true" style="font-size: 36px;"></i>

                    <i class="site-menu-icon icon md-assignment-check" aria-hidden="true"></i>
                    <span class="site-menu-title">Eventos <i class="icon md-assignment-check" aria-hidden="true" style="font-size: 36px;"></i>
    </span>
                    <span class="site-menu-arrow"></span>
                  </a>
                </li>

                <li class="site-menu-item">
                  <a class="animsition-link" href="clientes.html">
                    <i class="site-menu-icon icon md-assignment-account"></i>
                    <span class="site-menu-title">Clientes</span>
                    <span class="site-menu-arrow"></span>
                  </a>
                </li>
                
                <li class="site-menu-item">
                  <a class="animsition-link" href="proveedores.html">
                    <i class="site-menu-icon icon md-account-box-o" aria-hidden="true"></i>
                    <span class="site-menu-title">Proveedores</span>
                    <span class="site-menu-arrow"></span>
                  </a>
                </li>
                -->

					</ul>


				</div>
			</div>
		</div>

		<!--  Side Menu footer 

        <div class="site-menubar-footer">
          <a href="javascript: void(0);" class="fold-show" data-placement="top" data-toggle="tooltip"
          data-original-title="Settings">
            <span class="icon wb-settings" aria-hidden="true"></span>
          </a>
          <a href="javascript: void(0);" data-placement="top" data-toggle="tooltip" data-original-title="Lock">
            <span class="icon wb-eye-close" aria-hidden="true"></span>
          </a>
          <a href="javascript: void(0);" data-placement="top" data-toggle="tooltip" data-original-title="Logout">
            <span class="icon wb-power" aria-hidden="true"></span>
          </a>
        </div> 

        -->
	</div>

	<div class="site-gridmenu">
		<div>
			<div>
				<ul>
					<li><a href="apps/mailbox/mailbox.html"> <i
							class="icon wb-envelope"></i> <span>Mensajes</span>
					</a></li>
					<li><a href="apps/calendar/calendar.html"> <i
							class="icon wb-calendar"></i> <span>Agenda</span>
					</a></li>
					<li><a href="apps/contacts/contacts.html"> <i class="icon wb-user"></i>
							<span>Contactos</span>
					</a></li>
					<li><a href="apps/documents/categories.html"> <i
							class="icon wb-order"></i> <span>Briefs</span>
					</a></li>
					<li><a href="apps/projects/projects.html"> <i class="icon wb-image"></i>
							<span>Galerías</span>
					</a></li>
					<li><a href="apps/media/overview.html"> <i class="icon wb-camera"></i>
							<span>Videos</span>
					</a></li>
					<li><a href="apps/forum/forum.html"> <i class="icon wb-chat-group"></i>
							<span>Chats</span>
					</a></li>
					<li><a href="index.html"> <i class="icon wb-dashboard"></i> <span>Dashboard</span>
					</a></li>
				</ul>
			</div>
		</div>
	</div>


	<!-- Page -->
	<div class="page">

      <?=$content?>

    </div>
	<!-- End Page -->



	<!-- Footer -->
	<footer class="site-footer">
		<div class="site-footer-right dgom-ui-site-footer">
			<a href="http://2gom.com.mx/" target="_blank"> Desarrollado por 2 Geeks one Monkey</a>
		</div>
	</footer>

	<!-- Core  -->
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/jquery/jquery.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/bootstrap/bootstrap.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/animsition/jquery.animsition.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscroll/jquery-asScroll.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/mousewheel/jquery.mousewheel.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscrollable/jquery.asScrollable.all.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/ashoverscroll/jquery-asHoverScroll.js"></script>

	<!-- Plugins -->
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/switchery/switchery.min.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/intro-js/intro.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/screenfull/screenfull.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/slidepanel/jquery-slidePanel.js"></script>

	<!-- Plugins For This Page -->
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asrange/jquery-asRange.min.js"></script>

	<!-- Scripts -->
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/core.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/site.js"></script>

	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/menu.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/menubar.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/gridmenu.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/sidebar.js"></script>

	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/configs/config-colors.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/configs/config-tour.js"></script>

	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/asscrollable.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/animsition.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/slidepanel.js"></script>
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/switchery.js"></script>

	<!-- Scripts For This Page -->
	<script
		src="<?php echo Yii::app()->theme->baseUrl ?>/assets/examples/js/uikit/icon.js"></script>
	<script>
      (function(document, window, $) {
        'use strict';

        var Site = window.Site;
        $(document).ready(function() {
          Site.run();
        });
      })(document, window, jQuery);
    </script>

</body>

</html>
