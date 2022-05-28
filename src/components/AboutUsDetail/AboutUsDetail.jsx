import React from 'react';
import { Card } from 'react-bootstrap';

const AboutUsDetail = () => {
  return (
    <div>
      <div class="container">
        <h2>Acerca de Nosotros</h2>
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Card style={{ width: '80%' }}>
          <Card.Img variant="top" src="https://media.vogue.es/photos/5cc742d2fdc822d5201fe820/master/w_1600%2Cc_limit/comprar_vintage_227.jpg" />
          <Card.Body>
            <Card.Title>QUIENES SOMOS</Card.Title>
            <Card.Text>
              Nuestra filosofía tiene que ver con el espíritu empresarial y profesional que sirve perfectamente a nuestros clientes .Desde los primeros días nuestro equipo amplía su pasión para vender productos de primera calidad para nuestros clientes . A través de los años hemos logrado crear una de las marcas más famosas en el mundo y ahora estamos encantados de compartir nuestros productos en línea con usted. Nuestra misión no se trata de ganar enormes beneficios, nos preocupamos por la gente,porque la elección de nuestra tienda que nos está dando la oportunidad de cambiar una pequeña parte de su mundo y estamos felices de hacerlo profesionalmente y con pasión .
            </Card.Text>
            <Card.Text>
              Nuestro negocio está creciendo día a día y estamos contentos de anunciar un nuevo hito que se identifica con el lanzamiento de nuestra tienda web otra maravillosa manera de explorar y disfrutar de los mejores productos de nuestra marca. Al ser una tienda internacional es un gran reto para nuestra empresa , pero vamos a tomarlo con honor y dignidad. Podemos prometer que usted sentirá todas las ventajas de las compras en línea,porque ésta es la mejor manera de realizar sus compras y con toda la comodidad que no puede ofrecerle un comercio tradicional.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default AboutUsDetail