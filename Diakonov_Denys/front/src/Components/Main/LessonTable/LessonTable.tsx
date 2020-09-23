import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './LessonTable.sass'
import { LessonData } from '../../../Services/interfaces'
import {
    loadLessons,
    removeLesson,
    restoreLessons,
    addLesson,
} from '../../../Redux/Actions/lessonActions'

import download_img from '../../../Assets/download.svg'
import refresh_img from '../../../Assets/refresh.svg'
import add_img from '../../../Assets/add.svg'
import delete_img from '../../../Assets/delete.svg'
import DialogComponent from '../../Helpers/DialogComponent/DialogComponent'

class LessonTable extends React.Component<InjectedProps> {
    state = {
        createOpen: false,
        createName: '',
        genOpen: false,
        genLesson: 0,
        genNumber: '',
        genLabName: '',
    }

    componentDidMount() {
        this.props.load()
    }

    render() {
        const { lessons } = this.props
        return (
            <>
                <div className='table-container'>
                    <h1>Мої предмети</h1>
                    <div className='table-organisation'>
                        <div
                            id='refresh-btn'
                            onClick={this.props.restoreLessons}>
                            <img src={refresh_img} alt='refresh' />
                        </div>
                        <div
                            id='add-btn'
                            onClick={() => this.setState({ createOpen: true })}>
                            <img src={add_img} alt='add' />
                        </div>
                    </div>
                    <div className='table'>
                        {lessons.length > 0 ? (
                            <>
                                {lessons.map(obj => (
                                    <div className='table-row' key={obj.id}>
                                        <p>{obj.name}</p>
                                        <div className='table-row-controls'>
                                            <div
                                                className='del-btn'
                                                onClick={() =>
                                                    this.props.removeLesson(
                                                        obj.id
                                                    )
                                                }>
                                                <img
                                                    src={delete_img}
                                                    alt='delete'
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    this.setState({
                                                        genOpen: true,
                                                        genLesson: obj.id,
                                                    })
                                                }>
                                                Згенерувати
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className='table-row'>
                                <p>Заняття не знайдені</p>
                            </div>
                        )}
                    </div>
                </div>
                <DialogComponent
                    isOpen={this.state.createOpen}
                    close={() => this.setState({ createOpen: false })}>
                    <div className='dialog-content'>
                        <p className='dialog-title'>
                            Введіть назву потрібного предмета
                        </p>
                        <input
                            className='dialog-input'
                            type='text'
                            placeholder='Назва'
                            value={this.state.createName}
                            onChange={e =>
                                this.setState({ createName: e.target.value })
                            }
                        />
                        <div className='dialog-btns'>
                            <button
                                disabled={this.state.createName.trim() === ''}
                                onClick={() => {
                                    this.props.addLesson(this.state.createName)
                                    this.setState({
                                        createOpen: false,
                                        createName: '',
                                    })
                                }}>
                                Додати
                            </button>
                        </div>
                    </div>
                </DialogComponent>
                <DialogComponent
                    isOpen={this.state.genOpen}
                    close={() => this.setState({ genOpen: false })}>
                    <div className='dialog-content'>
                        <p className='dialog-title'>
                            Введіть параметри лабораторної роботи
                        </p>
                        <input
                            className='dialog-input'
                            type='text'
                            placeholder='Назва лабораторної роботи'
                            value={this.state.genLabName}
                            onChange={e =>
                                this.setState({ genLabName: e.target.value })
                            }
                        />
                        <input
                            className='dialog-input'
                            type='number'
                            placeholder='Номер лабораторної роботи'
                            value={this.state.genNumber}
                            onChange={e =>
                                this.setState({ genNumber: e.target.value })
                            }
                        />
                        <div className='dialog-btns'>
                            {this.state.genNumber.trim() &&
                                this.state.genLabName.trim() && (
                                    <a
                                        href={`https://lab-templates.herokuapp.com/api/lessons/${
                                            this.state.genLesson
                                        }/lab/?token=${
                                            this.props.token
                                        }&lab_name=${
                                            this.state.genLabName
                                        }&number=${parseInt(
                                            this.state.genNumber
                                        )}`}
                                        download>
                                        <img
                                            src={download_img}
                                            alt='download'
                                            onClick={() =>
                                                this.setState({
                                                    genOpen: false,
                                                    genNumber: '',
                                                    genLabName: '',
                                                })
                                            }
                                        />
                                    </a>
                                )}
                        </div>
                    </div>
                </DialogComponent>
            </>
        )
    }
}
interface InjectedProps {
    load(): void
    restoreLessons(): void
    removeLesson(id: number): void
    addLesson(name: string): void
    lessons: LessonData[]
    token: string
}

function mapStateToProps(state) {
    return {
        lessons: state.lessons.list,
        token: state.auth.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        load: () => dispatch(loadLessons()),
        restoreLessons: () => dispatch(restoreLessons()),
        removeLesson: (id: number) => dispatch(removeLesson(id)),
        addLesson: (name: string) => dispatch(addLesson(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonTable)
