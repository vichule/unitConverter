import React, { useState, useEffect  } from "react";
import love from "../images/love.png";
import exchange from "../images/exchange.png";
import exchangeb from "../images/exchangeb.png";
import rarrow from "../images/rarrow.png";
import Select from "react-select";
import uniqid from 'uniqid'

const Converter = () => {

    const [unitName, setUnitName] = useState('miles')
    const [unitName2, setUnitName2] = useState('km')
    const [unit, setUnit] = useState(null)
    const [unInt, setUnInt] = useState(100)
    const [unIntTotal, setUnIntTotal] = useState(62.15)
    const [savedList, setSavedList] = useState([])



    const revConvert = (e) =>{
        
        e.preventDefault()
        console.log(unIntTotal);
        setUnInt(parseFloat(unIntTotal).toFixed(2))
        setUnIntTotal(unInt)
    }

    const addSaved = (e)=>{
        e.preventDefault()
        
        const newSaved = {
            id:uniqid(),
            unit1:unitName2,
            unit2:unitName,
            int1:unInt,
            int2:unIntTotal
        }
        setSavedList([...savedList,newSaved])
        setUnInt(0)
        setUnIntTotal(0)
    }

    const deleteSaved = (id) => {
        const newList = savedList.filter(item => item.id !== id)
        setSavedList(newList)
    }
    
    
    const unitOptions = [
        {
            label: "km - miles" ,
            value: "1"
          },
          {
            label: "miles - km",
            value: "2"
          },
          {
            label: "ft - meter",
            value: "3"
          },
          {
            label: "meter - ft",
            value: "4"
          },
          {
            label: "cm - in.",
            value: "5"
          },
          {
            label: "in. - cm",
            value: "6"
          },
      ];

      const customStyles = {
        option: provided => ({
          ...provided,
          color: 'black'
        }),
        control: provided => ({
          ...provided,
          color: 'black'
        }),
        singleValue: provided => ({
          ...provided,
          color: 'black'
        })
      }

      const convertAction = () => { //por algun motivo realiza el cambio anterior o no lo atualiza hasta clickear en el input
        
        if(unit == "1"){
            
            setUnIntTotal((Number(unInt) / 1.609).toFixed(2))
            setUnitName("miles")
            setUnitName2("km")
            console.log(unIntTotal);
            
         
        }
        if(unit == "2"){
            setUnIntTotal((Number(unInt) * 1.609).toFixed(2))
            setUnitName("km")
            setUnitName2("miles")
            console.log(unIntTotal);
            
         
        }
        if(unit == "3"){
            setUnIntTotal((Number(unInt) * 3.281).toFixed(2))
            setUnitName("meter")
            setUnitName2("ft")
            console.log(unIntTotal);
            
         
        }
        if(unit == "4"){
            setUnIntTotal((Number(unInt) / 3.281).toFixed(2))
            setUnitName("ft")
            setUnitName2("meter")
            console.log(unIntTotal);
            
         
        }
        if(unit == "5"){
            setUnIntTotal((Number(unInt) / 2.54).toFixed(2))
            setUnitName("in")
            setUnitName2("cm")
            console.log(unIntTotal);
            
         
        }
        if(unit == "6"){
            setUnIntTotal((Number(unInt) * 2.54).toFixed(2))
            setUnitName("cm")
            setUnitName2("in")
            console.log(unIntTotal);
            
         
        }
        
        else{
            console.log("no funciona")
        }

      }

    return (
    
        
    <div>
        <div className="App-header" >
            <div className="post-header">
                <img  src={exchangeb} alt="arrow"/>
                unit converter
            </div>
        </div> 

        <div className="convert-box">
        <h2 style={{marginLeft: "20px"}}>convert</h2>
        <form className="convert-form">
            <Select 
                
                className="select" 
                options={unitOptions}
                onChange={({ value }) => {setUnit(value);convertAction()}}
                styles={customStyles} 
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 1,
                    colors: {
                      ...theme.colors,
                      primary25: 'purple',
                      primary: 'hotpink',
                      
                    },
                    
                  })}>
                
            </Select >
            {

            }<button onClick={revConvert} className="btnRev"><img className="img2" src={exchange} alt="arrow"/></button>
                
            <input 
                className="inputUnit"
                placeholder= '100'//el input de la cantidad, en el momento que se ponga, según el menú(que seran 6 elecciones/ints) hará una cosa u otra
                
                value={unInt}
                onChange={(e)=>{setUnInt(e.target.value);convertAction()} }
                onClick={convertAction}

            />{unitName2}

            
           
        </form>
        <button onClick={addSaved}>
            <img  src={love} alt="like"/>
        </button>
        <p className="totalConvert">{unIntTotal}  {unitName}</p>
        </div>

        <div className="saved">
                    <h2 className="savedTittle">saved</h2>
                    <ul className="columns">
                        {
                            savedList.map( item =>

                                <li key="{item.id}" className="favConvert">
                                    {item.int1} {""}
                                    {item.unit1} {" -- "}
                                    {item.int2} {""}
                                    {item.unit2}
                                    
                                    <button 
                                    className="btnDelete"
                                    style={{float: "right"}}
                                    onClick={ () => {deleteSaved(item.id)}}
                                    
                                    >
                                        X
                                    </button>

                                    
                                </li>

                            )
                        }
                    </ul>
                </div>
        
    </div>
    
    
    )

}

export default Converter;

//style={{}}