import React from "react";
import {Form} from "react-bootstrap";

function BusinessHours(props) {

    return (
        <>
            {props.businessHours?.status === 1 ?
                <Form.Control
                    as="select"
                    className="mr-sm-0"
                    id="inlineFormCustomSelect"
                    custom
                >
                    {props.businessHours?.startTimeFirstPeriodSunday ?
                        <option
                            value="SUN_START_FIRST">Dom:{props.businessHours?.startTimeFirstPeriodSunday}:{props.businessHours?.finalTimeFirstPeriodSunday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodSunday}:{props.businessHours?.finalTimeSecondPeriodSunday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodMonday ?
                        <option
                            value="MON_START_FIRST">Seg:{props.businessHours?.startTimeFirstPeriodMonday}:{props.businessHours?.finalTimeFirstPeriodMonday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodMonday}:{props.businessHours?.finalTimeSecondPeriodMonday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodTuesday ?
                        <option
                            value="TUE_START_FIRST">Ter:{props.businessHours?.startTimeFirstPeriodTuesday}:{props.businessHours?.finalTimeFirstPeriodTuesday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodTuesday}:{props.businessHours?.finalTimeSecondPeriodTuesday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodWednesday ?
                        <option
                            value="WED_START_FIRST">Qua:{props.businessHours?.startTimeFirstPeriodWednesday}:{props.businessHours?.finalTimeFirstPeriodWednesday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodWednesday}:{props.businessHours?.finalTimeSecondPeriodWednesday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodThursday ?
                        <option
                            value="THU_START_FIRST">Qui:{props.businessHours?.startTimeFirstPeriodThursday}:{props.businessHours?.finalTimeFirstPeriodThursday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodThursday}:{props.businessHours?.finalTimeSecondPeriodThursday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodFriday ?
                        <option
                            value="FRI_START_FIRST">Qua:{props.businessHours?.startTimeFirstPeriodFriday}:{props.businessHours?.finalTimeFirstPeriodFriday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodFriday}:{props.businessHours?.finalTimeSecondPeriodFriday}
                        </option> : <></>
                    }

                    {props.businessHours?.startTimeFirstPeriodSaturday ?
                        <option
                            value="SAT_START_FIRST">Qua:{props.businessHours?.startTimeFirstPeriodSaturday}:{props.businessHours?.finalTimeFirstPeriodSaturday}
                            &nbsp;às&nbsp;
                            {props.businessHours?.startTimeSecondPeriodSaturday}:{props.businessHours?.finalTimeSecondPeriodSaturday}
                        </option> : <></>
                    }
                </Form.Control> : <>Não Informado</>
            }
        </>
    )
}

export default BusinessHours;