Feature: Proyecto Elephant

@elephant
Scenario: Compra de un Elephant
    Given Ingreso a la pagina de DemoGuru99
    When Cuando doy clic en generar tarjeta
    And Copio el número de tarjeta
    And Copio el número de CVV
    And Copio la fecha de vencimiento
    And Copio el monto límite
    And Cierro la ventana de la tarjeta
    And Capturo el monto individual del producto
    And Selecciono la cantidad del producto a comprar
    And Doy clic en comprar
    And Ingreso el número de tarjeta
    And Ingreso el mes de vencimiento
    And Ingreso el año de vencimiento
    And Ingreso el CVV
    And Doy clic en pagar
    Then Me muestra el mensaje de pago exitoso
    And El número de orden de compra
    And Doy clic en Home
    And Regreso a la pantalla principal
    And Doy clic en revisar límite de crédito
    Then Ingreso el valor de la tarjeta
    And Doy clic en submit
    Then Me muestra los datos de compra