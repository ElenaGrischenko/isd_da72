import React from "react";
import s from "./AlcoTester.module.scss"

const AlcoTester = (props) => {
    return(
        <div className={s.wrapper}>
            <header>
                <h1>
                    AlkoTester
                </h1>
            </header>
            <form action="#">
                <h2>
                    Персональная інформація
                </h2>
                <div className={s.personalInf}>
                    <div className={s.sexSelect}>
                        <input type="radio" name="radio" id="male" className="css-radio"/>
                        <label htmlFor="male" className="css-label">Чоловік</label>
                        <input type="radio" name="radio" id="female" className="css-radio"/>
                        <label htmlFor="female" className="css-label">Жінка</label>
                    </div>
                    <div className={s.age}>
                        <h3>
                            Ваш вік
                        </h3>
                        <input type="text" placeholder="18"/>
                    </div>
                    <div className={s.weight}>
                        <h3>
                            Ваш вага
                        </h3>
                        <input type="text"/>
                    </div>
                    <div className={s.height}>
                        <h3>
                            Ваш зріст
                        </h3>
                        <input type="text"/>
                    </div>
                </div>
                <div className={s.drinks}>
                    <h2>
                        Алкогольний напій
                    </h2>
                    <div className={s.weight}>
                        <h3>
                            Міцність
                        </h3>
                        <input type="text"/>
                    </div>
                    <div className={s.height}>
                        <h3>
                            Об’єм
                        </h3>
                        <input type="text"/>
                    </div>
                </div>
                <button>
                    Підрахувати
                </button>
            </form>
        </div>
    )
}

export default AlcoTester;