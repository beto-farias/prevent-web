<?php
/**
 * Menu lateral 
 */
?>
	<div class="site-menubar">
    <div class="site-menubar-body">
      <div>
        <div>
          <ul class="site-menu">
<!--             <li class="site-menu-category">General</li> -->
            <li class="site-menu-item  active open">
            	<?=CHtml::link('<i class="site-menu-icon wb-dashboard" aria-hidden="true"></i>
                <span class="site-menu-title">Dashboard</span>', array("siteBase/index"), array("data-slug"=>"dashboard"));?>
<!--                 <div class="site-menu-badge"> -->
<!--                   <span class="badge badge-success">2</span> -->
<!--                 </div> -->
              
            </li>
             <li class="site-menu-item">
            <?php echo CHtml::link('<i class="site-menu-icon wb-list-bulleted" aria-hidden="true"></i>
                <span class="site-menu-title">Eventos</span>
                <div class="site-menu-label">
                  
                </div>', array("wrkDelitos/index"),array("class"=>"animsition-link", "data-slug"=>"UsuariosS"))?>
            </li>
            
            <li class="site-menu-item">
            <?php echo CHtml::link('<i class="site-menu-icon wb-users" aria-hidden="true"></i>
                <span class="site-menu-title">Usuarios</span>
                <div class="site-menu-label">
                  
                </div>', array("entUsuarios/index"),array("class"=>"animsition-link", "data-slug"=>"UsuariosS"))?>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  

