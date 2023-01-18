import { Avatar, Button, Card, Col, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { Correction, Traduction } from "../../Api";

export const TraductionComponent: React.FC = (props) => {
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState({
        tans: false,
        correct: false,
    });
    const [trans, setTrans] = useState<string>("");
    const [language, setLanguage] = useState({
        from: "",
        to: "French",
    });
    const translate = () => {
        const data = {
            prompt: `Translate this into ${language.to} : ${trans}`,
        };
        if (trans) {
            setLoading({ ...loading, tans: true });
            Traduction(data)
                .then((res) => {
                    if (res.choices.length) {
                        console.log("data", res.choices[0].text);
                        setResponse(res.choices[0].text.trim());
                    }
                    setLoading({ ...loading, tans: false });
                })
                .catch((err) => console.log("err", err));
        } else setResponse("");
    };
    const correction = () => {
        if (trans) {
            setLoading({ ...loading, correct: true });
            Correction({ input: trans })
                .then((res) => {
                    if (res.choices.length) {
                        setTrans(res.choices[0].text.trim());
                    }
                    setLoading({ ...loading, correct: false });
                })
                .catch((err) => console.log("err", err));
        }
    };
    return (
        <div className="p-4">
            <Card
                className="shadow"
                title={
                    <div className="d-flex justify-content-center align-items-center">
                        <Button
                            type="text"
                            className="p-2 text-button d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <Avatar></Avatar>
                                <span className="mx-3 fw-bold fs-5 text-color">
                                    Anglais
                                </span>
                            </div>

                            <i className="bi bi-chevron-down"></i>
                        </Button>

                        <i className="bi bi-arrow-left-right x-large  mx-5"></i>
                        <Button
                            type="text"
                            className="p-2 text-button d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <Avatar></Avatar>
                                <span className="mx-3 fw-bold fs-5 text-color">
                                    Français
                                </span>
                            </div>
                            <i className="bi bi-chevron-down"></i>
                        </Button>
                    </div>
                }
            >
                <Row className="p-0 m-0">
                    <Col className="w-50 user-text p-3 ">
                        <TextArea
                            placeholder="maxLength is 100"
                            maxLength={100}
                            className="text-area"
                            value={trans}
                            onChange={(e) => setTrans(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mt-3">
                            <Space size="large">
                                <Button
                                    type="primary"
                                    className="correct"
                                    icon={
                                        loading.correct ? (
                                            ""
                                        ) : (
                                            <i className="bi bi-check-all" />
                                        )
                                    }
                                    onClick={() => correction()}
                                    loading={loading.correct}
                                >
                                    Correcteur
                                </Button>
                                <Button
                                    type="primary"
                                    className="copy"
                                    icon={
                                        <i className="bi bi-clipboard-check-fill mx-1" />
                                    }
                                >
                                    Copy
                                </Button>
                            </Space>
                            <Button
                                type="primary"
                                className="correct"
                                loading={loading.tans}
                                icon={
                                    loading.tans ? (
                                        ""
                                    ) : (
                                        <i className="bi bi-translate mx-1" />
                                    )
                                }
                                onClick={() => translate()}
                            >
                                Traduction
                            </Button>
                        </div>
                    </Col>
                    <Col className="w-50 p-3 read-only-text">
                        <textarea
                            className="text-area readOnly"
                            readOnly
                            value={response}
                        ></textarea>
                        <div className="d-flex justify-content-end">
                            <Space size="large">
                                <Button
                                    type="primary"
                                    className="copy"
                                    icon={
                                        <i className="bi bi-clipboard-check-fill mx-1" />
                                    }
                                >
                                    Copy
                                </Button>
                                <Button type="primary" className="correct">
                                    Sugest
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
