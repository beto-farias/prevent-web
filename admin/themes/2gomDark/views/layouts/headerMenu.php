<?php
/**
 * Menu que se posicione en el top de la pantalla
 */

?>
	<nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega"
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
			<div class="navbar-brand navbar-brand-center site-gridmenu-toggle"
				data-toggle="gridmenu">
				<img class="navbar-brand-logo" src="<?=Yii::app()->request->baseUrl?>/images/logos/logo_provicional.png" title="PrevenT">
				<span class="navbar-brand-text"> PrevenT Admin </span>
			</div>
			<button type="button" class="navbar-toggle collapsed"
				data-target="#site-navbar-search" data-toggle="collapse">
				<span class="sr-only">Toggle Search</span> <i class="icon wb-search"
					aria-hidden="true"></i>
			</button>
		</div>

		<div class="navbar-container container-fluid">
			<!-- Navbar Collapse -->
			<div class="collapse navbar-collapse navbar-collapse-toolbar"
				id="site-navbar-collapse">
				<!-- Navbar Toolbar -->
				<ul class="nav navbar-toolbar">
					<li class="hidden-float" id="toggleMenubar"><a
						data-toggle="menubar" href="#" role="button"> <i
							class="icon hamburger hamburger-arrow-left"> <span
								class="sr-only">Toggle menubar</span> <span
								class="hamburger-bar"></span>
						</i>
					</a></li>
					<li class="" id="toggleFullscreen"><a class="icon icon-fullscreen"
						data-toggle="fullscreen" href="#" role="button"> <span
							class="sr-only">Toggle fullscreen</span>
					</a></li>
					
				</ul>
				<!-- End Navbar Toolbar -->
			</div>
			<!-- End Navbar Collapse -->
		</div>
	</nav>