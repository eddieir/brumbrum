import 'cypress-xpath';
import 'cypress-iframe';


describe('Scenario 1: Check the header', () => {
    it('should contain Space Cinema in the header', () => {
        cy.visit('https://www.thespacecinema.it/');
        cy.get('button#onetrust-accept-btn-handler').click();
        cy.get('img[src="https://www.thespacecinema.it/-/media/images/header/italy/new-logo-2023/tsc_logo_header_2.jpg?h=60&la=it-IT&w=244"]')
        .should('be.visible');
        cy.get('body').screenshot('Header'); // screen shot regrading the header 
    });
    
  });


  describe('Scenario 2: press hamburger menu and go to cinema', () => {
    it('press hamburger menu and go to cinema', () => {
        cy.visit('https://www.thespacecinema.it/');
        cy.get('button#onetrust-accept-btn-handler').click();
      
        cy.get('a.hamburger-trigger.icon-hamburger[data-src-id="hamburger"]').eq(0).click({force: true});
        cy.get('a[href="/al-cinema"]:not([target])').eq(0).click({force: true});
        cy.get('body').screenshot('Hamburger menu');  //Hamburder menu

    });
  });

  describe('Scenario 3: Select the cinema theatre and check availability', () => {
    it('should select a cinema theatre and check availability', () => {
        cy.visit('https://www.thespacecinema.it/al-cinema/');
        cy.get('button#onetrust-accept-btn-handler').click();
        cy.get('a.filmlist__info__more[rv-href="item.filmlink"][href="/film/bad-boys-ride-or-die"]').click({force:true});
        cy.get('div.details__synopsis').should('contain.text', 'I “Bad Boys” più amati del mondo tornano con il loro iconico mix di azione e ironia sfrenata, ma questa volta con un colpo di scena: i due fuoriclasse di Miami sono ora i ricercati.');
        //cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]').click({force:true});
        cy.get('div.filmtimes__venue').click({force:true});
        cy.wait(4000);
        cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]')
        .click();
        
        cy.get('li.select-option').contains('Beinasco (Torino)').click({force:true});
        cy.get('body').screenshot('Check_Cinema');
       

    });
  });

  describe('Scenario 4: Select 5th available slot', () => {
    it('should select the 5th available slot and check user landed to select number of tickets', () => {

        cy.visit('https://www.thespacecinema.it/al-cinema/');
        
        cy.get('body').then($body => {
            if ($body.find('iframe#cf-chl-widget-h27d0').length > 0) {
                cy.handleIframe('iframe#cf-chl-widget-h27d0', 'button.your-verify-button-selector');
                cy.get('#challenge-success-text').should('be.visible');
            }
        });
        cy.get('button#onetrust-accept-btn-handler').click();
        cy.get('a.filmlist__info__more[rv-href="item.filmlink"][href="/film/bad-boys-ride-or-die"]').click({force:true});
        cy.get('div.details__synopsis').should('contain.text', 'I “Bad Boys” più amati del mondo tornano con il loro iconico mix di azione e ironia sfrenata, ma questa volta con un colpo di scena: i due fuoriclasse di Miami sono ora i ricercati.');
        //cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]').click({force:true});
        cy.get('div.filmtimes__venue').click({force:true});
        cy.wait(4000);
        cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]')
        .click();
        
        cy.get('li.select-option').contains('Beinasco (Torino)').click({force:true});
        cy.wait(2000);
        //cy.get('a.small[title="22:15"][href*="/prenotare-il-biglietto/summary"]').click({force:true});
        cy.xpath("(//a[@class='small'])[5]").click({force:true});
        cy.get('body').screenshot('Reserve slot');
    });
  });

  describe('Scenario 5: Select tickets and press Vai', () => {
    it('should select one adult ticket and one bambino ticket and press Vai', () => {
        cy.visit('https://www.thespacecinema.it/al-cinema/');
        
        cy.get('button#onetrust-accept-btn-handler').click();
        cy.get('a.filmlist__info__more[rv-href="item.filmlink"][href="/film/bad-boys-ride-or-die"]').click({force:true});
        cy.get('div.details__synopsis').should('contain.text', 'I “Bad Boys” più amati del mondo tornano con il loro iconico mix di azione e ironia sfrenata, ma questa volta con un colpo di scena: i due fuoriclasse di Miami sono ora i ricercati.');
        //cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]').click({force:true});
        cy.get('div.filmtimes__venue').click({force:true});
        cy.wait(8000);
        cy.get('a.select-cinema__trigger[data-href="/partials/GetCinemaFinderContent"][data-target-url="/film/bad-boys-ride-or-die"][data-cinema-url="/data/SetCinema"]')
        .click();
        
        cy.get('li.select-option').contains('Beinasco (Torino)').click({force:true});
        //cy.get('a.small[title="22:15"][href*="/prenotare-il-biglietto/summary"]').click({force:true});
        cy.wait(2000);
        //cy.get('.icon.icon-arrow-down').click();
        cy.xpath("(//a[@class='small'])[5]").click({force:true});
        cy.wait(2000);
         // Check for iframe and handle the challenge if present and visible
        
        
        cy.get('iframe[id^="cf-chl-widget-"]').should('be.visible').then(iframe => {
            // Use cypress-iframe to interact with the iframe
            cy.iframe(iframe).find('input[type="checkbox"]').click();
        });
        
        cy.wait(40000);
        //cy.xpath("//fieldset[@id='bookingBuy']//div[@class='ticket-selection__wrapper container container--overlay content-light form']")
      //.should('be.visible');
        cy.xpath("//fieldset[@id='bookingBuy']//div[@class='ticket-selection__wrapper container container--overlay content-light form']").click({force:true});
        cy.xpath("//div[@class='ticket-selection__row form__field']").eq(0).click({force:true});
        cy.xpath("//fieldset[@id='bookingBuy']//div[@class='ticket-selection__wrapper container container--overlay content-light form']//div[1]").eq(2).click();
        cy.get('select.ticket-selection__input').eq(5).select('2');
        cy.get('a#close-tickets.btn.btn--white').click();
        cy.wait(2000);
        // Ensure the covering element is not interfering
         cy.get('#seating-click-area').invoke('css', 'pointer-events', 'none');

        // Give some time for the UI to settle
        cy.wait(1000);

        // Use JavaScript to click on the canvas
        cy.window().then((win) => {
            const canvas = win.document.getElementById('seat-canvas');
            const rect = canvas.getBoundingClientRect();
            const canvasWidth = rect.width;
            const canvasHeight = rect.height;

            // Generate first set of random coordinates
            const x1 = Math.floor(Math.random() * canvasWidth);
            const y1 = Math.floor(Math.random() * canvasHeight);

            // Generate second set of random coordinates
            const x2 = Math.floor(Math.random() * canvasWidth);
            const y2 = Math.floor(Math.random() * canvasHeight);

            // Create and dispatch mouse events for the first set of coordinates
            const clickEvent1 = new MouseEvent('click', {
            clientX: rect.left + x1,
             clientY: rect.top + y1,
            bubbles: true,
            cancelable: true
      });
      canvas.dispatchEvent(clickEvent1);

      // Give some time between clicks
      cy.wait(500);

      // Create and dispatch mouse events for the second set of coordinates
      const clickEvent2 = new MouseEvent('click', {
        clientX: rect.left + x2,
        clientY: rect.top + y2,
        bubbles: true,
        cancelable: true
      });
      canvas.dispatchEvent(clickEvent2);
    });
        
        
        cy.get('a#close-tickets.btn.btn--white').click({force:true});
        //cy.xpath("//div[@data-scroll-id='ticket-selection']//span[@class='booking-step__header__back icon icon-arrow-left']//*[name()='svg']").click({force:true});
        debugger
        //cy.xpath("//fieldset[@id='bookingBuy']//div[2]//div[2]//div[1]//select[1]").click();
        //cy.xpath("//a[@id='close-seating']").click();
        cy.xpath("//span[normalize-space()='VERIFICA E PROSEGUI']").click({force:true});
        cy.xpath("(//a[normalize-space()='continua senza registrarti'])[1]").click();
        cy.get('input#review-guest-email')
        .clear() // Clear any existing value
        .type('peyman.iravani@gmail.com') // Type the new email address
        cy.get('span.icon-tick-black-before').click();
        cy.get('span.recaptcha-checkbox').click();
        cy.get('body').screenshot('Finish the seat selection');
    });
  });
  
 


  describe('Scenario 6: Landing to payment', () => {
    it('should land on the payment page and check it', () => {
      //cy.visit('https://www.thespacecinema.it/');
      cy.get('#input-card-fake').type('1234567890123456'); // Example credit card number
      cy.get('#input-data-dummy').type('12/28'); // input expire date
      cy.get('#input-card-fake').type('123'); // input cvv2
      cy.get('#input-cardholdername').type('Random person'); //input name of the card holder 
      cy.get('#input-cardholderforname').type('Smith'); //input lastname of the card holder 
      
      //check the email address if it contains the data clean it and then import the data
      const newEmail = 'newemail@example.com';
      cy.get('#input-cardHolderEmail').then($input => {
        if ($input.val() !== '') {
          cy.get('#input-cardHolderEmail').clear();
        }
      });
  
      // Type new email address
      cy.get('#input-cardHolderEmail').type(newEmail);
  
      // Optionally, assert the input field has the correct value
      cy.get('#input-cardHolderEmail').should('have.value', newEmail);
      cy.get('body').screenshot('User data input');
 
    });
  });
  
  
  


  
    
  