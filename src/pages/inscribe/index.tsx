import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Inscribe.module.css'
import { FILE_MAXSIZE, MAX_FEE_RATE, MIN_FEE_RATE, OUTPUT_UTXO, SERVICE_FEE } from '@/constant'
import { timeEstimate } from '@/helpers'
import { useState } from 'react'
import { getAddressInfo, validate } from 'bitcoin-address-validation'

const inter = Inter({ subsets: ['latin'] })

export default function Inscribe() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [previewUrls, setPreviewUrls] = useState<(string | undefined)[]>([]);
    const [pendingInscribe, setPendingInscribe] = useState(false);
    const [pendingEstimate, setPendingEstimate] = useState(false);
    const [estimateFeeSats, setEstimateFeeSats] = useState(0);
    const [value, setValue] = useState({
        feeRate: 15,
        recipientAddress: "-1",
    });
    const [error, setError] = useState<{
        [key: string]: string
    }>({
        feeRate: '',
        recipientAddress: '',
    });

    const checkValidation = (input: any, inputValue: any) => {
        let terror = 0;
        let message = "";
        var reg;
        switch (input) {
            case "feeRate":
                inputValue = parseFloat(inputValue);
                reg = new RegExp(/^[+-]?\d+(\.\d+)?$/);
                if (
                    !reg.test(inputValue) ||
                    parseFloat(inputValue) < MIN_FEE_RATE ||
                    parseFloat(inputValue) > MAX_FEE_RATE
                ) {
                    terror += 1;
                    message = "Please Enter Valid FeeRate!";
                } else {
                    message = "";
                }
                break;

            case "recipientAddress":
                if (inputValue < 0 || !getAddressInfo(inputValue).bech32) {
                    terror += 1;
                    message = "Please Input Ord-compatible wallet address!";
                } else {
                    message = "";
                }
                break;

            default:
                terror += 0;
                break;
        }

        if (terror > 0) {
            setError({ ...error, [input]: message });
            return false;
        } else {
            setError({ ...error, [input]: "" });
            return true;
        }
    };

    const checkAllValidation = () => {
        let terror = 0;
        Object.keys(value).map((key, index) => {
            if (error[key] !== undefined && error[key].length > 0) terror += 1;
            return true;
        });
        if (value.feeRate < MIN_FEE_RATE || value.feeRate > MAX_FEE_RATE) terror += 1;
        if (value.recipientAddress.length === 0 || !getAddressInfo(value.recipientAddress).bech32) terror += 1;
        if (terror > 0) {
            return false;
        } else {
            return true;
        }
    };

    const onChangeInput = (e: any) => {
        e.preventDefault();
        checkValidation(e.target.name, e.target.value);
        setValue({ ...value, [e.target.name]: e.target.value });
        setEstimateFeeSats(0);
    };

    function handleFileSelect(event: any) {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
    }

    function readFile(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function handleUpload() {
        const fileContents = await Promise.all(files.map(readFile));
        const formData = new FormData();
        fileContents.forEach((content: any, index) => {
            formData.append(`file${index}`, new Blob([content]), files[index].name);
        });
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        console.log(response);
    }

    // function handleFileChange(event: any) {
    //     const fileArray = Array.from(event.target.files)
    //     const filteredFiles = fileArray.filter((item: any) => item && item?.size <= FILE_MAXSIZE)
    //     setFiles(filteredFiles)
    //     const _previewUrls: (string | undefined)[];
    //     for (var index = 0; index < filteredFiles.length; index++) {
    //         const fileReader = new FileReader();
    //         fileReader.onload = () => {
    //             _previewUrls.fileReader.result?.toString()]);
    //         };
    //         fileReader.readAsDataURL(filteredFiles[index] as Blob);
    //     }
    //     if (filteredFiles.length > 0) {
    //         setEstimateFeeSats(0);
    //     }

    //     // const selectedFile = event.target.files[0];
    //     // if (selectedFile && selectedFile.size <= FILE_MAXSIZE) {
    //     //     setFile(selectedFile);
    //     //     const fileReader = new FileReader();
    //     //     fileReader.onload = () => {
    //     //         setPreviewUrl(fileReader.result?.toString());
    //     //     };
    //     //     fileReader.readAsDataURL(selectedFile);
    //     //     setEstimateFeeSats(0);
    //     // } else {
    //     //     // dispatch(
    //     //     //     action.setAlertMessage({
    //     //     //         type: ALERT_WARN,
    //     //     //         message: "File size should be less than 400KB",
    //     //     //     })
    //     //     // );
    //     // }
    // }

    const handleEstimateInscribe = async (e: any) => {
        e.preventDefault();
        // if (pendingInscribe || pendingEstimate || pendingApprove) {
        //     dispatch(
        //         action.setAlertMessage({
        //             type: ALERT_WARN,
        //             message: `Pending... Please wait until few seconds!`,
        //         })
        //     );
        //     return;
        // }

        // if (checkAllValidation() && file) {
        //     setPendingEstimate(true);
        //     const formData = new FormData();
        //     formData.append("file", file);
        //     formData.append("feeRate", value.feeRate);
        //     formData.append(
        //         "btcAccount",
        //         userDepositAddressInfo.depositAddress
        //             ? userDepositAddressInfo.depositAddress
        //             : BECH32_EXAMPLE
        //     );
        //     try {
        //         const response = await axios.post(
        //             `${API_PATH}/users/estimateInscribe`,
        //             formData
        //         );
        //         console.log(response.data);
        //         if (response.data.status === SUCCESS) {
        //             const _estimateFeeToken = getTokenAmountFromWei(
        //                 value.tokenAddress,
        //                 await getTokenWeiAmount(
        //                     value.tokenAddress,
        //                     parseInt(response.data.result) + OUTPUT_UTXO + SERVICE_FEE
        //                 )
        //             );
        //             setEstimateFeeAsToken(_estimateFeeToken);
        //             setEstimateFeeSats(response.data.result);
        //         } else {
        //             dispatch(
        //                 action.setAlertMessage({
        //                     type: ALERT_ERROR,
        //                     message: "Estimate Fail. Please try again.",
        //                 })
        //             );
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_ERROR,
        //                 message: `Something went wrong!  errCode: ${error}`,
        //             })
        //         );
        //     }
        //     setPendingEstimate(false);
        // } else {
        //     if (!checkAllValidation()) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please fill the input data correctly.",
        //             })
        //         );
        //     } else if (!file) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please select your artifact.",
        //             })
        //         );
        //     }
        // }
    };

    const handleInscribeNow = async (e: any) => {
        e.preventDefault();
        // if (pendingInscribe || pendingEstimate || pendingApprove) {
        //     dispatch(
        //         action.setAlertMessage({
        //             type: ALERT_WARN,
        //             message: `Pending... Please wait until few seconds!`,
        //         })
        //     );
        //     return;
        // }

        // if (
        //     curWeb3 &&
        //     isAccount(curAccount) &&
        //     checkAllValidation() &&
        //     file &&
        //     userDepositAddressInfo.depositAddress
        // ) {
        //     setPendingInscribe(true);

        //     const formDataEstimate = new FormData();
        //     formDataEstimate.append("file", file);
        //     formDataEstimate.append("feeRate", value.feeRate);
        //     formDataEstimate.append(
        //         "btcAccount",
        //         userDepositAddressInfo.depositAddress
        //     );
        //     try {
        //         const response = await axios.post(
        //             `${API_PATH}/users/estimateInscribe`,
        //             formDataEstimate
        //         );
        //         if (response.data.status === SUCCESS) {
        //             const _estimateFeeSats = parseInt(response.data.result);
        //             const _estimateFeeWeiAmount = await getTokenWeiAmount(
        //                 value.tokenAddress,
        //                 _estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE
        //             );
        //             const inscribeContract = new curWeb3.eth.Contract(
        //                 INSCRIBE_ABI,
        //                 ISNCRIBE_ADDRESS
        //             );

        //             const inscribe =
        //                 value.tokenAddress === ETH
        //                     ? inscribeContract.methods.inscribeWithETH(
        //                         userDepositAddressInfo.depositAddress,
        //                         _estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE,
        //                         Math.floor(Date.now() / 1000) + 1200
        //                     )
        //                     : inscribeContract.methods.inscribe(
        //                         userDepositAddressInfo.depositAddress,
        //                         _estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE,
        //                         value.tokenAddress,
        //                         Math.floor(Date.now() / 1000) + 1200
        //                     );

        //             const msgValue =
        //                 value.tokenAddress === ETH ? _estimateFeeWeiAmount : 0;

        //             const estimateGas = await inscribe.estimateGas({
        //                 from: curAccount,
        //                 value: msgValue,
        //             });
        //             // console.log("[===estimateGas===]", estimateGas);
        //             const gasPrice = (await getCurrentGasPrices(MAINNET)).medium;
        //             // console.log("[===gasPrice===]", gasPrice);

        //             const _estimateFeeToken = parseFloat(
        //                 getTokenAmountFromWei(value.tokenAddress, _estimateFeeWeiAmount)
        //             );
        //             // console.log("[===_estimateFeeToken===]", _estimateFeeToken);
        //             setEstimateFeeAsToken(_estimateFeeToken);
        //             setEstimateFeeSats(_estimateFeeSats);

        //             const gasGASAmountToETH = parseFloat(
        //                 getGASETHAmount(gasPrice, estimateGas)
        //             );
        //             console.log("[===gasGASAmountToETH===]", gasGASAmountToETH);

        //             const totalNeededETH =
        //                 value.tokenAddress === ETH
        //                     ? _estimateFeeToken + gasGASAmountToETH
        //                     : gasGASAmountToETH;
        //             console.log("[===totalNeededETH===]", totalNeededETH);
        //             console.log("[===_estimateFeeToken===]", _estimateFeeToken);
        //             const ethAmount = getTokenAmount(ETH);
        //             console.log("[===ethAmount===]", ethAmount);
        //             const tokenAmount = getTokenAmount();
        //             console.log("[===tokenAmount===]", tokenAmount);

        //             if (ethAmount >= totalNeededETH && tokenAmount >= _estimateFeeToken) {
        //                 await inscribe
        //                     .send({
        //                         from: curAccount,
        //                         gas: estimateGas,
        //                         gasPrice: gasPrice,
        //                         value: msgValue,
        //                     })
        //                     .then(async (txHash) => {
        //                         // RUN_MODE(txHash);
        //                         const txHashString = `${txHash.transactionHash}`;
        //                         dispatch(
        //                             action.setAlertMessage({
        //                                 type: ALERT_SUCCESS,
        //                                 message: `Success! txHash is ${getDisplayString(
        //                                     txHashString,
        //                                     5,
        //                                     6
        //                                 )}`,
        //                             })
        //                         );
        //                         //
        //                         const number = txHash.events.LogInscribe.returnValues.number;
        //                         const formData = new FormData();
        //                         const actionDate = Date.now();
        //                         formData.append("file", file);
        //                         formData.append("erc20Inscriber", curAccount);
        //                         formData.append("feeRate", value.feeRate);
        //                         formData.append("number", number);
        //                         formData.append("actionDate", actionDate);
        //                         const _data = {
        //                             erc20Inscriber: curAccount,
        //                             feeRate: value.feeRate.toString(),
        //                             number: number,
        //                             actionDate: actionDate.toString(),
        //                         };
        //                         const _signData = await signMessageHash(
        //                             curWeb3,
        //                             curAccount,
        //                             JSON.stringify(_data)
        //                         );
        //                         formData.append("signData", _signData.message);

        //                         if (_signData.success === true) {
        //                             const response = await axios.post(
        //                                 `${API_PATH}/users/inscribe`,
        //                                 formData
        //                             );
        //                             console.log(response.data);
        //                             if (response.data.status === SUCCESS) {
        //                                 dispatch(
        //                                     action.setAlertMessage({
        //                                         type: ALERT_SUCCESS,
        //                                         message: `Inscribe Success! Your Inscription will appear on your wallet ${getDisplayString(
        //                                             userDepositAddressInfo.depositAddress,
        //                                             8,
        //                                             8
        //                                         )} in ${timeEstimate(value.feeRate)}`,
        //                                     })
        //                                 );
        //                             } else {
        //                                 dispatch(
        //                                     action.setAlertMessage({
        //                                         type: ALERT_ERROR,
        //                                         message: "Inscribe Fail. Please try again.",
        //                                     })
        //                                 );
        //                             }
        //                         } else {
        //                             dispatch(
        //                                 action.setAlertMessage({
        //                                     type: ALERT_WARN,
        //                                     message: "SIGN FAIL",
        //                                 })
        //                             );
        //                         }
        //                     })
        //                     .catch((err) => {
        //                         dispatch(
        //                             action.setAlertMessage({
        //                                 type: ALERT_ERROR,
        //                                 message: `${err}`,
        //                             })
        //                         );
        //                     });
        //             } else {
        //                 if (ethAmount < totalNeededETH) {
        //                     dispatch(
        //                         action.setAlertMessage({
        //                             type: ALERT_WARN,
        //                             message: `Your ETH Balance is not enough to inscribe!`,
        //                         })
        //                     );
        //                 } else if (tokenAmount < _estimateFeeToken) {
        //                     dispatch(
        //                         action.setAlertMessage({
        //                             type: ALERT_WARN,
        //                             message: `Your ${getTokenSymbol(
        //                                 value.tokenAddress
        //                             )} Balance is not enough to inscribe!`,
        //                         })
        //                     );
        //                 }
        //             }
        //         } else {
        //             dispatch(
        //                 action.setAlertMessage({
        //                     type: ALERT_ERROR,
        //                     message: "Estimate Fail. Please try again.",
        //                 })
        //             );
        //         }
        //     } catch (error) {
        //         console.error(error);
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_ERROR,
        //                 message: `Something went wrong!  errCode: ${error}`,
        //             })
        //         );
        //     }
        //     setPendingInscribe(false);
        // } else {
        //     if (!curWeb3 || !isAccount(curAccount)) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please connect wallet correctly.",
        //             })
        //         );
        //     } else if (!checkAllValidation()) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please fill the input data correctly.",
        //             })
        //         );
        //     } else if (!file) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please select your artifact.",
        //             })
        //         );
        //     } else if (!userDepositAddressInfo.depositAddress) {
        //         dispatch(
        //             action.setAlertMessage({
        //                 type: ALERT_WARN,
        //                 message: "Please sign up to inscribe your digital artifact.",
        //             })
        //         );
        //     }
        // }
    };

    return (
        <>
            <section
                className="section bg-effect pb-0 bg-no-repeat bg-bottom-center"
            >
                <div className="container" style={{ marginTop: '150px' }}>
                    <div className="py-6 bg-cover bg-no-repeat bg-center" style={{ marginBottom: '50px' }}>
                        <div className="container text-center">
                            <h1 className="text-white m-0">
                                Inscribe your own digital artifact on bitcoin network
                            </h1>
                        </div>
                    </div>
                    <div className="row gy-5">
                        <div className="col-md-8">
                            <div className={`border-gray-200 rounded-3 ${styles.card}`}>
                                <div className="card-body p-lg-4">
                                    <form>
                                        <div className="row gy-4">
                                            <div className="col-12">
                                                <label className="form-label">
                                                    Upload yoru artifact
                                                </label>
                                                <div
                                                    className="h-px-150px rounded d-flex align-items-center p-4 justify-content-center d-flex position-relative border border-2 border-gray-300 rounded-3"
                                                    style={{ borderStyle: "dashed" }}
                                                >
                                                    <div className="pe-none d-flex align-items-center justify-content-center flex-column">
                                                        <div className="icon-md bg-gray-300 rounded-circle">
                                                            <i className="bi-upload"></i>
                                                        </div>
                                                        <p className="m-0 pt-3 fs-sm">
                                                            {`Drop file or click to select.`}
                                                        </p>
                                                        <p className="m-0 pt-3 fs-sm">
                                                            {`Must be <400kb each of type.`}
                                                        </p>
                                                        <p className="m-0 pt-3 fs-sm">
                                                            {`Supported type: apng gif glb jpg png stl svg webp.`}
                                                        </p>
                                                    </div>
                                                    <input
                                                        className="position-absolute top-0 end-0 start-0 bottom-0 opacity-0"
                                                        multiple
                                                        type="file"
                                                        name="upload"
                                                        accept=".apng,.gif,.glb,.jpg,.png,.stl,.svg,.webp"
                                                        disabled={
                                                            pendingInscribe ||
                                                            pendingEstimate
                                                        }
                                                        onChange={handleFileSelect}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Fee Rate</label>
                                                <input
                                                    type="number"
                                                    name="feeRate"
                                                    min={MIN_FEE_RATE}
                                                    max={MAX_FEE_RATE}
                                                    className="form-control"
                                                    disabled={
                                                        pendingInscribe || pendingEstimate
                                                    }
                                                    placeholder="Enter fee rate"
                                                    onChange={onChangeInput}
                                                />
                                                <div>
                                                    <span className="help-text fs-sm">
                                                        {`Range: ${MIN_FEE_RATE}~${MAX_FEE_RATE} sats/vB. Suggested: 15~25 sats/vB. Default: 15 sats/vB`}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="help-text fs-sm">
                                                        {`Time Estimate: ${timeEstimate(value.feeRate)}`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={`col-12 ${styles.inscribebuttons}`}
                                            >
                                                <div className={styles.inscribebutton} style={{ padding: "20px" }}>
                                                    <button
                                                        className={`w-100 btn btn-primary ${styles.button}`}
                                                        disabled={
                                                            pendingInscribe ||
                                                            pendingEstimate
                                                        }
                                                        onClick={(e) => handleEstimateInscribe(e)}
                                                    >
                                                        {pendingEstimate
                                                            ? `Estimating Inscribe Price...`
                                                            : `Estimate Inscribe Price`}
                                                    </button>
                                                </div>
                                                <div className={styles.inscribebutton} style={{ padding: "20px" }}>
                                                    <button
                                                        className={`w-100 btn btn-primary ${styles.button}`}
                                                        disabled={
                                                            pendingInscribe ||
                                                            pendingEstimate
                                                        }
                                                        onClick={(e) => handleInscribeNow(e)}
                                                    >
                                                        {pendingInscribe
                                                            ? `Inscribing Now...`
                                                            : `Inscribe Now`}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {
                                files && files.length > 0 && (
                                    <div className={styles.productCard}>
                                        <div className='row g-3'>
                                            {files.map((file, index) => (
                                                <div className='col-sm-6 col-lg-6' key={index}>
                                                    <img
                                                        className={styles.rounded3}
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        title=""
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            <br />
                            {estimateFeeSats > 0 && (
                                <div className={styles.productCard}>
                                    <div className="product-card-body">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6 className="help-text fs-md">{`Inscribe Fee:`}</h6>
                                            <h6 className="help-text fs-md">
                                                {`${estimateFeeSats} sats`}
                                            </h6>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6 className="help-text fs-md">{`Output UTXO:`}</h6>
                                            <h6 className="help-text fs-md">{`${OUTPUT_UTXO} sats`}</h6>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6 className="help-text fs-md">{`Service Fee:`}</h6>
                                            <h6 className="help-text fs-md">{`${SERVICE_FEE} sats`}</h6>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6 className="help-text fs-md">{`Total as Sats:`}</h6>
                                            <h6 className="help-text fs-md">
                                                {`${estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE} sats`}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br></br>
            </section>
        </>
    )
}
