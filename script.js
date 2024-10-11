
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger:.2,
        delay:-1
    })
    .from("#herofooter", {
        y: '-10',
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut,
        delay:-1
    })
    

}

//jab mouse move ho to skew kar paaye aur maximum skew and minimum skew define kar paaye, jab mouse move ho to chapta ki value badhe, and jab mouse chalna band ho jaaye to chapta hata lo

var timeout;


function circleChaptaKaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        xscale=gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
       
       
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`    
        },100);
        

    });
}



function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(${xscale},${yscale})`
    })
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();



//teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pta karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x,y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale, waise waise rotation bhi tez ho jaye 


document.querySelectorAll(".elem")
.forEach(function (elem){

    var rotate = 0;
    var diffrot = 0;
    
    elem.addEventListener("mouseleave", function(dets){
        var imag=elem.querySelector("img");
        dets.stopPropagation();
        gsap.to(imag,{
            opacity:0,
            ease: Power3,
        })

    });
    
    
    
    
    
    
    
    
    
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        dets.stopImmediatePropagation();
        
        
        var imag=elem.querySelector("img");


        
        gsap.to(imag,{
            opacity:1,
            ease: Power3,
            top: diff-imag.clientHeight,
            left: dets.clientX-imag.clientWidth,
            rotate: gsap.utils.clamp(-20,20,diffrot),
        }
    )

    });
});