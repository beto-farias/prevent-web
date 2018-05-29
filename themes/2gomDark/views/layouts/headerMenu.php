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
				<!-- <img class="navbar-brand-logo" src="assets/images/logo.png" title="Remark"> -->
				<span class="navbar-brand-text"> Publiza </span>
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
					<li class="hidden-float"><a class="icon wb-search"
						data-toggle="collapse" href="#" data-target="#site-navbar-search"
						role="button"> <span class="sr-only">Toggle Search</span>
					</a></li>
				</ul>
				<!-- End Navbar Toolbar -->

				<!-- Navbar Toolbar Right -->
				<ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
					<li class="dropdown"><a class="navbar-avatar dropdown-toggle"
						data-toggle="dropdown" href="#" aria-expanded="false"
						data-animation="scale-up" role="button"> <span
							class="avatar avatar-online"> <img
								src="<?php echo Yii::app()->theme->baseUrl ?>/assets/portraits/5.jpg"
								alt="..."> <i></i>
						</span>
					</a>
						<ul class="dropdown-menu" role="menu">
							<li role="presentation"><a href="javascript:void(0)"
								role="menuitem"><i class="icon wb-user" aria-hidden="true"></i>
									Mi perfil</a></li>
							<!-- <li role="presentation">
                    <a href="javascript:void(0)" role="menuitem"><i class="icon wb-payment" aria-hidden="true"></i> Billing</a>
                  </li>
                  <li role="presentation">
                    <a href="javascript:void(0)" role="menuitem"><i class="icon wb-settings" aria-hidden="true"></i> Settings</a>
                  </li> -->
							<li class="divider" role="presentation"></li>
							<li role="presentation"><a href="javascript:void(0)"
								role="menuitem"><i class="icon wb-power" aria-hidden="true"></i>
									Cerrar sesión</a></li>
						</ul></li>
					<li class="dropdown"><a data-toggle="dropdown"
						href="javascript:void(0)" title="Notifications"
						aria-expanded="false" data-animation="scale-up" role="button"> <i
							class="icon wb-bell" aria-hidden="true"></i> <span
							class="badge badge-danger up">5</span>
					</a>
						<ul class="dropdown-menu dropdown-menu-right dropdown-menu-media"
							role="menu">
							<li class="dropdown-menu-header" role="presentation">
								<h5>NOTIFICACIONES</h5> <span
								class="label label-round label-danger">5 Nuevas</span>
							</li>

							<li class="list-group" role="presentation">
								<div data-role="container">
									<div data-role="content">
										<a class="list-group-item" href="javascript:void(0)"
											role="menuitem">
											<div class="media">
												<div class="media-left padding-right-10">
													<i class="icon wb-order bg-red-600 white icon-circle"
														aria-hidden="true"></i>
												</div>
												<div class="media-body">
													<h6 class="media-heading">Se actualizó el gasto del evento
														"Nombre de Evento"</h6>
													<time class="media-meta"
														datetime="2015-06-12T20:50:48+08:00">Hace 5 Horas</time>
												</div>
											</div>
										</a> <a class="list-group-item" href="javascript:void(0)"
											role="menuitem">
											<div class="media">
												<div class="media-left padding-right-10">
													<i class="icon wb-user bg-green-600 white icon-circle"
														aria-hidden="true"></i>
												</div>
												<div class="media-body">
													<h6 class="media-heading">Facturar evento "Campaña Seccion
														Amarilla"</h6>
													<time class="media-meta"
														datetime="2015-06-11T18:29:20+08:00">hace 1 día</time>
												</div>
											</div>
										</a> <a class="list-group-item" href="javascript:void(0)"
											role="menuitem">
											<div class="media">
												<div class="media-left padding-right-10">
													<i class="icon wb-settings bg-red-600 white icon-circle"
														aria-hidden="true"></i>
												</div>
												<div class="media-body">
													<h6 class="media-heading">Actualizacion de Evento</h6>
													<time class="media-meta"
														datetime="2015-06-11T14:05:00+08:00">hace 2 días</time>
												</div>
											</div>
										</a> <a class="list-group-item" href="javascript:void(0)"
											role="menuitem">
											<div class="media">
												<div class="media-left padding-right-10">
													<i class="icon wb-calendar bg-blue-600 white icon-circle"
														aria-hidden="true"></i>
												</div>
												<div class="media-body">
													<h6 class="media-heading">Inicio del Evento "Stands Puertos
														CPTM"</h6>
													<time class="media-meta"
														datetime="2015-06-10T13:50:18+08:00">hace 3 días</time>
												</div>
											</div>
										</a> <a class="list-group-item" href="javascript:void(0)"
											role="menuitem">
											<div class="media">
												<div class="media-left padding-right-10">
													<i class="icon wb-chat bg-orange-600 white icon-circle"
														aria-hidden="true"></i>
												</div>
												<div class="media-body">
													<h6 class="media-heading">Mensaje recibido</h6>
													<time class="media-meta"
														datetime="2015-06-10T12:34:48+08:00">hace 4 días</time>
												</div>
											</div>
										</a>
									</div>
								</div>
							</li>
							<li class="dropdown-menu-footer" role="presentation"><a
								class="dropdown-menu-footer-btn" href="javascript:void(0)"
								role="button"> <i class="icon wb-settings" aria-hidden="true"></i>
							</a> <a href="javascript:void(0)" role="menuitem"> Todas las
									notificaciones </a></li>
						</ul></li>
					<li id="toggleChat"><a data-toggle="site-sidebar"
						href="javascript:void(0)" title="Chat"
						data-url="../site-sidebar.tpl"> <i class="icon wb-chat"
							aria-hidden="true"></i>
					</a></li>
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
								placeholder="Buscar evento...">
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