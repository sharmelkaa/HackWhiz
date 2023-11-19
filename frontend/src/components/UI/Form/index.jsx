import * as SC from './styles'

export const Form = ({ onSubmit, children }) => <SC.FormWrapper onSubmit={onSubmit}>{children}</SC.FormWrapper>