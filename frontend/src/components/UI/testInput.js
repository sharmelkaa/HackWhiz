export const TestInput = ({ label, register, validation }) => {
    return(
        <>
            <label>{label}</label>
            <input {...register(label, { ...validation })} />
        </>
    )
}