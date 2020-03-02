
class Kalkulators {
    constructor(id){ 
        this.konteiners=document.getElementById(id);
        if(this.konteiners){

            this.divPirmaisSkaitlis=document.createElement("div");
            this.divPirmaisSkaitlis.setAttribute("class","divskaitlis");
            this.konteiners.appendChild(this.divPirmaisSkaitlis);

            this.divEsosaDarbiba=document.createElement("div");
            this.divEsosaDarbiba.setAttribute("class","darbibaszime");
            this.konteiners.appendChild(this.divEsosaDarbiba);

            this.divRezultats=document.createElement("div");            //Vieta, kur rakstīs iekšā rezultātu.
            this.divRezultats.setAttribute("class","rezultats"); 
            this.konteiners.appendChild(this.divRezultats);

            this.divPoguLauks=document.createElement("div");
            this.divPoguLauks.setAttribute("id","keyboard");
            this.konteiners.appendChild(this.divPoguLauks);

            this.divSkaitli=document.createElement("div");
            this.divSkaitli.setAttribute("id","numbers");
            this.konteiners.appendChild(this.divSkaitli);

            this.divDarbibas=document.createElement("div");
            this.divDarbibas.setAttribute("id","functions");
            this.konteiners.appendChild(this.divDarbibas);

            this.darbibuSaraksts=["+","-","x",":"] //darbības, ko veiks kalkulators

            this.pieliktPogas();

            let btnDzestVisu = document.createElement("button");
            btnDzestVisu.innerHTML = "CE";
            btnDzestVisu.onclick = () => this.dzestVisu();
            btnDzestVisu.setAttribute("class","dzest poga");
            this.divPoguLauks.appendChild(btnDzestVisu);

        }
        this.statuss=Kalkulators.STATUSS_DARBIBA; // Statuss DARBIBA ir tikmēr, kamēr nav ticis ievadīts skaitlis.
        this.PirmaisSkaitlis=0; // Šis ir tas mainīgais, kurā glabāsies tas skaitlis, kurš bija uz ekrāna pirms darbības pogas piespiešanas.
        this.Darbiba = ""; // Šeit glabāsies tas, kuru darbību mēs grasāmies darīt. "" - Nav vēl saglabāta darbība.
        this.IrKomats = 0; // Vai komata poga ir piespiesta, vai arī vēl ne?
        this.CipariEkrana = 0; //Cik ciparu ekrānā jau uzrakstīti?
        this.redzamais=0; //Sākumā jābūt 0.
    
    }

    set Darbiba(teksts){
        this._darbiba=teksts;
        this.divEsosaDarbiba.innerHTML=teksts;
    }
    get Darbiba(){
        return this._darbiba;
    }

    set PirmaisSkaitlis(skaitlis){
        this._pirmaisSkaitlis=skaitlis;
        this.divPirmaisSkaitlis.innerHTML=skaitlis;
    }
    get PirmaisSkaitlis(){
        return this._pirmaisSkaitlis;
    }

    set redzamais(skaitlis){
        skaitlis=Math.round(skaitlis*100000000)/100000000; //Ne vairāk kā 8cipari pēc komata.
        this._redzamais = skaitlis;
        if(this.statuss===Kalkulators.STATUSS_KLUDA){
            this.divRezultats.innerHTML="ERROR";
            return;
        }
        if(this.CipariEkrana===0){
            this.divRezultats.innerHTML=Math.round(skaitlis*100000000)/100000000;
            return;
        }
        if(this.IrKomats===0){
            this.divRezultats.innerHTML=Math.round(skaitlis*100000000)/100000000;
        }else{
            let ciparipeckomata=this.CipariEkrana-this.IrKomats;
            if(ciparipeckomata===0){
                this.divRezultats.innerHTML=skaitlis+".";
            } else{
                this.divRezultats.innerHTML=skaitlis.toFixed(ciparipeckomata);
            }
        }
        console.log ("Izvada rezultatu logā");
    }

    get redzamais() {
        return this._redzamais;       //Ar this.redzamais var piekļūt tai vērtībai, kas logā. Matemātiski pareizai. Ja rakstīts 1.000, tad dabūs 1
    }

    dzestVisu(){
        this.CipariEkrana=0;
        this.IrKomats=0;
        this.Darbiba="";
        this.statuss=Kalkulators.STATUSS_DARBIBA;
        this.redzamais=0;
        this.PirmaisSkaitlis=0;

        console.log("Dzest visu"); 
    }

    uzrakstitKomatu(){

        if(this.CipariEkrana===0){
            this.statuss=Kalkulators.STATUSS_SKAITLIS;  //Uzstādam, ka tiek ievadīts skaitlis
            this.IrKomats=1;
            this.CipariEkrana=1;                        //Uzstādam, ka ievadāmajam skaitlim ir komats
            this.redzamais=0;                           //Ievadīts skaitlis 0.
            return;                                     //Vairs nevajag nekā darīt
        }
        if (this.statuss===Kalkulators.STATUSS_KLUDA){
            return;                                     //Nedarbojas, ja ir ERROR
        }
        if(this.statuss===Kalkulators.STATUSS_SKAITLIS){
            if(this.IrKomats===0){
                this.IrKomats=this.CipariEkrana;
                this.redzamais=this.redzamais; //Šī rindiņa nepieciešama, lai uz ekrāna izdrukātos jaunais skaitlis ar jau galā komatu.
            }
        }
        console.log("komats");
    }

    uzrakstitCiparu(cipars){
        let jaunaisRedzamais = 0;
        if(this.statuss===Kalkulators.STATUSS_KLUDA||this.CipariEkrana===9){
            return;
        }
        if(this.statuss===Kalkulators.STATUSS_REZULTATS){
            this.Darbiba="";
        }
        if(this.CipariEkrana===0){
            this.CipariEkrana=1;
            this.IrKomats=0;
            jaunaisRedzamais=cipars;
        } else{
            if(this.IrKomats===0){
                jaunaisRedzamais=this.redzamais*10+cipars;
                this.CipariEkrana++;
                console.log(this.CipariEkrana);
            } else{
                jaunaisRedzamais=this.redzamais+(cipars/Math.pow(10,this.CipariEkrana-this.IrKomats+1));
                this.CipariEkrana++;
            }
        }
        this.redzamais=jaunaisRedzamais;
        this.statuss=Kalkulators.STATUSS_SKAITLIS; //Nupat ierakstījām skaitli logā. 

        console.log(this.redzamais);
    }

    veiktDarbibu(darbiba){

        if(this.statuss===Kalkulators.STATUSS_KLUDA){
            return;
        }

        if(this.statuss===Kalkulators.STATUSS_REZULTATS){
            this.PirmaisSkaitlis=this.redzamais;
            this.Darbiba=darbiba;
            this.CipariEkrana=0;
            this.IrKomats=0;
            this.statuss=Kalkulators.STATUSS_DARBIBA;
        }
        if(this.statuss===Kalkulators.STATUSS_DARBIBA){
            this.Darbiba=darbiba;
        } else {
            this.statuss=Kalkulators.STATUSS_DARBIBA;
            if(this.Darbiba!==""){
                this.izpilditAtminu();
            }

            this.Darbiba=darbiba;
            this.CipariEkrana=0;
            this.PirmaisSkaitlis=this.redzamais;
            this.IrKomats=0;
        }
 
        console.log(darbiba);
    }

    izpilditAtminu(){
        switch(this.Darbiba){
            case "+":
                this.redzamais=this.PirmaisSkaitlis+this.redzamais;
                break;
            case "-":
                this.redzamais=this.PirmaisSkaitlis-this.redzamais;
                break;
            case "x":
                this.redzamais=this.PirmaisSkaitlis*this.redzamais;
                break;
            case ":":
                if(this.redzamais==0){
                    this.statuss=Kalkulators.STATUSS_KLUDA;
                    this.redzamais="ERROR";
                    return;
                }
                this.redzamais=this.PirmaisSkaitlis/this.redzamais;
                break;
        }
    }
    kvadratsakne(){
        this.CipariEkrana=0;
        if(this.redzamais<0){
            this.statuss=Kalkulators.STATUSS_KLUDA;
            this.redzamais="ERROR";
            return;
        }
        this.redzamais=Math.sqrt(this.redzamais);
        this.statuss=Kalkulators.STATUSS_SKAITLIS;
        return;
    }

    rezultats(){
        this.CipariEkrana=0;
        this.izpilditAtminu();
        this.statuss=Kalkulators.STATUSS_REZULTATS;
        this.PirmaisSkaitlis=this.redzamais;
        return;
    }

    plusmin(){
        if(this.statuss=Kalkulators.STATUSS_SKAITLIS){
            this.redzamais*=-1;
            this.CipariEkrana=0;
        } else{return;}
    }

    pieliktPogas(){                                     //Izveido pogas
        for(let i=1;i<=10;i++){
            let poga=document.createElement("button");  //Pievieno ciparu pogas
            poga.innerHTML=i%10;
            poga.onclick=(evt)=>{
                this.uzrakstitCiparu(i%10);
            }
            poga.setAttribute("class","skaitlis poga num"+i%10);
            this.divSkaitli.appendChild(poga);
        }

        let poga=document.createElement("button");      //Pievieno komata pogu
        poga.innerHTML=",";
        poga.onclick=()=> this.uzrakstitKomatu();
        poga.setAttribute("class","skaitlis komats poga");
        this.divSkaitli.appendChild(poga);

        let poga0=document.createElement("button");      //Pievieno +/- pogu
        poga0.innerHTML="+/-";
        poga0.onclick=()=> this.plusmin();
        poga0.setAttribute("class","darbiba plusmin poga");
        this.divSkaitli.appendChild(poga0);



        for(let i in this.darbibuSaraksts){             //Pievieno darbību pogas
            let poga=document.createElement("button");
            poga.innerHTML=this.darbibuSaraksts[i];
            poga.onclick=(evt)=> {
                this.veiktDarbibu(this.darbibuSaraksts[i]);
            }
            poga.setAttribute("class","darbiba poga");
            this.divDarbibas.appendChild(poga);   
        }

        let poga1=document.createElement("button");      //Pievieno komata pogu
        poga1.innerHTML="sqrt";
        poga1.onclick=()=> this.kvadratsakne();
        poga1.setAttribute("class","darbiba poga");
        this.divDarbibas.appendChild(poga1);

        let poga2=document.createElement("button");      //Pievieno komata pogu
        poga2.innerHTML="=";
        poga2.onclick=()=> this.rezultats();
        poga2.setAttribute("class","darbiba vienads poga");
        this.divDarbibas.appendChild(poga2);


    }


}

Kalkulators.STATUSS_KLUDA = 0; //Tad, ja dala ar 0 vai arī dara ko citu nederīgu (ja nu pieliksim vēl darbības), kā arī, ja rezultāts par lielu (virs 15 cipariem)
Kalkulators.STATUSS_DARBIBA=1; //Tad, ja ir sākums vai arī pēdējā poga piespiestā ir darbības poga.
Kalkulators.STATUSS_SKAITLIS=2; //Tad, ja pēdējā poga piespiestā ir skaitļa poga
Kalkulators.STATUSS_REZULTATS=3; //Tad, ja tikko "=" poga piespiesta.