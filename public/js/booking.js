var stripe = Stripe('pk_test_51Kj0KMSC1smQ9uqpZ95e4XBXS1yKGe6Jz6gCalrUJ3JJoswBuILAQSCnScNJCdDLX3bN8b27czjAcEm1SuZ9QqRT00WEAL9bm5');
const planBtns = document.querySelectorAll(".pay");

for(i = 0; i < planBtns.length; i++){
    planBtns[i].addEventListener("click" , async function(){
        try {
            //console.log(this);
            const planId = this.getAttribute("planId");
            let session = await axios.post("https://foodiess-app.herokuapp.com/api/bookings/createbookingsession" , {planId});
            console.log(session);
            let sessId = session.data.session.id;
            let result = await stripe.redirectToCheckout({ sessionId: sessId });
            console.log(result);
            
            
        } catch (error) {
            console.log(error);
        }
    })
}