<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="bootstrap admin template">
  <meta name="author" content="">

  <title>Login | Remark Admin Template</title>

  <link rel="apple-touch-icon" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/images/apple-touch-icon.png">
  <link rel="shortcut icon" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/images/favicon.ico">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/bootstrap-extend.min.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/css/site.min.css">

  <!-- Plugins -->
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/animsition/animsition.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscrollable/asScrollable.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/switchery/switchery.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/intro-js/introjs.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/slidepanel/slidePanel.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/flag-icon-css/flag-icon.css">

  <!-- Fonts -->
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/fonts/web-icons/web-icons.min.css">
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/fonts/brand-icons/brand-icons.min.css">
  <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
  <!-- Inline -->
  <link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl ?>/assets/examples/css/pages/login.css">

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
</head>
<body class="<?=$this->classBody?>">
  <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


  <!-- Page -->
  <div class="page animsition vertical-align text-center" data-animsition-in="fade-in"
  data-animsition-out="fade-out">>
    <div class="page-content vertical-align-middle">
    <?php echo $content?>
      <footer class="page-copyright page-copyright-inverse">
        <p>WEBSITE BY 2 Geeks one Monkey</p>
        <p>© 2015. All RIGHT RESERVED.</p>
      </footer>
    </div>
  </div>
  <!-- End Page -->


  <!-- Core  -->
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/jquery/jquery.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/bootstrap/bootstrap.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/animsition/jquery.animsition.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscroll/jquery-asScroll.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/mousewheel/jquery.mousewheel.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/asscrollable/jquery.asScrollable.all.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/ashoverscroll/jquery-asHoverScroll.js"></script>

  <!-- Plugins -->
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/switchery/switchery.min.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/intro-js/intro.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/screenfull/screenfull.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/slidepanel/jquery-slidePanel.js"></script>

  <!-- Plugins For This Page -->
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/vendor/jquery-placeholder/jquery.placeholder.js"></script>

  <!-- Scripts -->
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/core.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/site.js"></script>

  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/menu.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/menubar.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/gridmenu.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/sections/sidebar.js"></script>

  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/configs/config-colors.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/configs/config-tour.js"></script>

  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/asscrollable.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/animsition.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/slidepanel.js"></script>
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/switchery.js"></script>

  <!-- Scripts For This Page -->
  <script src="<?php echo Yii::app()->theme->baseUrl ?>/assets/js/components/jquery-placeholder.js"></script>

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
