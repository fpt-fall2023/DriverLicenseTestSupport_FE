import { Button, Input, Select, Spin, notification } from "antd"
import { Link } from "react-router-dom"
import styles from './QuestionBank.module.css'
import { useEffect, useState } from "react"
import { addQuestionBank, getQuestions } from "../../../apis/QuestionService"
import { questionBankArray, questionCategoryType } from "./AddPageData"
import ConfirmationPrompt from "../../../components/ConfirmationPopup/ConfirmationPrompt"

const AddQuestionBank = () => {
    const [isLoading, setIsLoading] = useState(false)

    const tohruLoading = <div style={{ width: "25rem" }}>
        <img src="https://cdn.discordapp.com/attachments/1127111850958524447/1165559316753952828/tohru-cute.gif" />
        <div style={{ fontWeight: "bold" }}>
            ... đợi xíu. Tohru đang trôm câu hỏi về cho bạn
        </div>
    </div>

    const [questionBankName, setQuestionBankName] = useState()
    const [driveType, setDriveType] = useState()
    const [questionToBank, setQuestionToBank] = useState(questionBankArray)
    const [questionCategory, setQuestionCategory] = useState(questionCategoryType)

    //Lọc từng mục
    const [khaiNiem, setKhaiNiem] = useState([])
    const [nghiepVuVanTai, setNghiepVuVanTai] = useState([])
    const [vanHoaDaoDuc, setVanHoaDaoDuc] = useState([])
    const [kyThuatLaiXe, setKyThuatLaiXe] = useState([])
    const [cauTaoSuaChua, setCauTaoSuaChua] = useState([])
    const [bienBao, setBienBao] = useState([])
    const [saHinh, setSaHinh] = useState([])
    const [diemLiet, setDiemLiet] = useState([])

    //Truyền vào để hiển thị câu hỏi
    const [questionShow, setQuestionShow] = useState()

    //Lọc câu hỏi theo mục
    const [filteredQuestion, setFilteredQuestion] = useState([])

    const handleShowCategory = (value) => {
        if (value === "1") {
            setFilteredQuestion(khaiNiem)
        }
        if (value === "3") {
            setFilteredQuestion(nghiepVuVanTai)
        }
        if (value === "5") {
            setFilteredQuestion(vanHoaDaoDuc)
        }
        if (value === "6") {
            setFilteredQuestion(kyThuatLaiXe)
        }
        if (value === "7") {
            setFilteredQuestion(cauTaoSuaChua)
        }
        if (value === "8") {
            setFilteredQuestion(bienBao)
        }
        if (value === "9") {
            setFilteredQuestion(saHinh)
        }
        if (value === "10") {
            setFilteredQuestion(diemLiet)
        }
        document.getElementById("secondPart").style.display = "block"
        document.getElementById("questionDescription").style.display = "none"
    }

    const showQuestion = (value) => {
        document.getElementById("questionDescription").style.display = "block"
        setQuestionShow(value)
    }

    useEffect(() => {
        handleQuestionCategory()
    }, [])

    const handleQuestionCategory = () => {
        setIsLoading(true)
        getQuestions().then(res => {
            if (res.status === 200 || res.status === 304) {
                setIsLoading(false)
                const data = res.data.data.Question
                const khaiNiem = data.filter(item => item.category.questionType === "khái niệm và quy tắc giao thông đường bộ")
                const nghiepVuVanTai = data.filter(item => item.category.questionType === "nghiệp vụ vận tải")
                const vanHoaDaoDuc = data.filter(item => item.category.questionType === "văn hóa & đạo đức người lái xe")
                const kyThuatLaiXe = data.filter(item => item.category.questionType === "kỹ thuật lái xe")
                const cauTaoSuaChua = data.filter(item => item.category.questionType === "cấu tạo sữa chữa")
                const bienBao = data.filter(item => item.category.questionType === "hệ thống biển báo hiệu đường bộ")
                const saHinh = data.filter(item => item.category.questionType === "sa hình và kỹ năng xử lý tình huống giao thông")
                const diemLiet = data.filter(item => item.category.questionType === "mất an toàn giao thông nghiêm trọng (câu hỏi điểm liệt)")

                setKhaiNiem(khaiNiem)
                setNghiepVuVanTai(nghiepVuVanTai)
                setVanHoaDaoDuc(vanHoaDaoDuc)
                setKyThuatLaiXe(kyThuatLaiXe)
                setCauTaoSuaChua(cauTaoSuaChua)
                setBienBao(bienBao)
                setSaHinh(saHinh)
                setDiemLiet(diemLiet)
            }
        })
    }

    const handleAddQuestionToBank = (value) => {
        handleQuestionToBankLogic(value, "khái niệm", 0, 9)
        handleQuestionToBankLogic(value, "nghiệp vụ", 1, 1)
        handleQuestionToBankLogic(value, "văn hóa", 2, 1)
        handleQuestionToBankLogic(value, "kỹ thuật", 3, 2)
        handleQuestionToBankLogic(value, "cấu tạo", 4, 1)
        handleQuestionToBankLogic(value, "hệ thống biển báo", 5, 10)
        handleQuestionToBankLogic(value, "sa hình", 6, 10)
        handleQuestionToBankLogic(value, "mất an toàn giao thông", 7, 1)
    }

    const handleQuestionToBankLogic = (question, startWith, arrayIndex, questionLimit) => {
        if (question.category.questionType.startsWith(`${startWith}`)) {
            const updatedQuestionToBank = [...questionToBank]
            const checkDuplicate = updatedQuestionToBank[arrayIndex].question.find(item => item === question._id)
            if (checkDuplicate) {
                notification.error({
                    message: `Câu hỏi này đã tồn tại trong mục ${startWith}`
                })
                return
            }
            updatedQuestionToBank[arrayIndex].question.push(question._id)
            setQuestionToBank(updatedQuestionToBank)
            notification.success({
                message: `${startWith} ${updatedQuestionToBank[arrayIndex].question.length}/${questionLimit}`
            })

            if (updatedQuestionToBank[arrayIndex].question.length > questionLimit - 1) {
                const updatedQuestionCategory = [...questionCategory]
                updatedQuestionCategory[arrayIndex].disabled = true
                document.getElementById("secondPart").style.display = "none"
            }
        }
    }

    const handleSubmitQuestionBank = () => {
        const allQuestions = questionToBank.reduce((questionBank, currentQuestionCategory) => {
            return questionBank.concat(currentQuestionCategory.question)
        }, [])
        addQuestionBank(questionBankName, allQuestions, driveType).then(res => {
            if (res.status === 201) {
                notification.success({
                    message: "Tạo đề thành công"
                })
                window.location.reload()
            }
        }).catch(err => {
            notification.error({
                message: "Tạo đề thất bại. Hãy chắc là tên đề này chưa tồn tại"
            })
        })
    }

    return (
        <div style={{ height: "100%" }}>
            <ConfirmationPrompt />
            <Link to="/dashboard/QuestionBankPage"><Button type="primary">Quay Về</Button></Link>
            <Spin spinning={isLoading} indicator={tohruLoading}>
                <div className={styles.questionBank__details}>
                    <div className={styles.questionBank__details__line}>
                        <div className={styles.questionBank__details__title}>Tên Đề:</div>
                        <Input placeholder="Nhập tên đề" style={{ width: "15rem" }} onChange={(e) => { setQuestionBankName(e.target.value) }} />
                        <div className={styles.questionBank__details__title}>Loại Bằng:</div>
                        <Select
                            defaultValue="Bằng B1"
                            options={
                                [
                                    {
                                        value: "B1",
                                        label: "Bằng B1",
                                    },
                                    {
                                        value: "B2",
                                        label: "Bằng B2"
                                    }
                                ]
                            }
                            onChange={(value) => { setDriveType(value) }}
                        />
                        <div className={styles.questionBank__details__title}>Mục Câu Hỏi Trong Đề:</div>
                        <Select
                            placeholder="Chọn mục câu hỏi"
                            options={questionCategory}
                            style={{ width: "15rem" }}
                            onSelect={(value) => {
                                handleShowCategory(value)
                            }}
                        />

                        <div className={styles.questionBank__details__title}>Tổng Số Câu Hỏi Mỗi Mục:</div>
                        <div>
                            {
                                questionToBank.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div style={{ fontWeight: "bold", marginTop: "1rem" }}>
                                                {item.questionCategoryType}: <span style={{ fontWeight: "lighter" }}>{item.question.length}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            {
                                questionToBank.reduce((sum, item) => {
                                    return sum + item.question.length
                                }, 0) === 35 ? <Button type="primary" style={{ width: "10rem", height: "3rem", marginTop: "1rem" }} onClick={() => handleSubmitQuestionBank()}>Tạo Đề</Button> : <Button type="primary" style={{ width: "10rem", height: "3rem", marginTop: "1rem" }} disabled>Tạo Đề</Button>
                            }
                            <Button type="primary" style={{ width: "10rem", height: "3rem", marginTop: "1rem", marginLeft: "1rem" }} onClick={() => alert("Tính năng đang được phát triển")}>Xem Trước</Button>
                        </div>

                    </div>

                    <div className={styles.questionBank__details__description} id="secondPart">
                        {
                            filteredQuestion?.map((item, index) => {
                                return (
                                    <Button onClick={() => showQuestion(item)} key={item._id}>{index + 1}</Button>
                                )
                            })
                        }
                        <div style={{ display: "none", fontSize: "20px" }} id="questionDescription">
                            <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "2rem" }}>Mô Tả Câu Hỏi</div>
                            <div id="questionDescription_name">{questionShow?.questionName}</div>
                            <div style={{ marginTop: "1rem" }}>
                                {questionShow?.answers.map((item, index) => {
                                    return (
                                        <div key={item._id}>
                                            <div>{index + 1}. {item.answerName}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Button type="primary" style={{ width: "10rem", height: "3rem", marginTop: "1rem" }} onClick={() => handleAddQuestionToBank(questionShow)}>Thêm</Button>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default AddQuestionBank