import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

interface TimerFormData {
  itemName: string;
  timerPeriod: number;
  image: FileList | null;
}

interface RegisterTimerModalProps {
  onClose: () => void;
  onSubmit: (data: TimerFormData) => void;
}

const RegisterTimerModal: React.FC<RegisterTimerModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TimerFormData>();

  const onSubmitForm = (data: TimerFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>새 타이머 등록</h2>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup>
            <Label htmlFor="itemName">아이템 이름</Label>
            <Controller
              name="itemName"
              control={control}
              defaultValue=""
              rules={{ required: "아이템 이름은 필수입니다" }}
              render={({ field }) => <Input {...field} id="itemName" />}
            />
            {errors.itemName && (
              <ErrorMessage>{errors.itemName.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="timerPeriod">타이머 주기 (일)</Label>
            <Controller
              name="timerPeriod"
              control={control}
              defaultValue={0}
              rules={{
                required: "타이머 주기는 필수입니다",
                min: { value: 1, message: "1 이상의 값을 입력해주세요" },
              }}
              render={({ field }) => (
                <Input {...field} id="timerPeriod" type="number" />
              )}
            />
            {errors.timerPeriod && (
              <ErrorMessage>{errors.timerPeriod.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">이미지</Label>
            <Controller
              name="image"
              control={control}
              defaultValue={null}
              rules={{
                required: "이미지는 필수입니다",
                validate: (value) => {
                  if (value && value[0]) {
                    return (
                      ["image/jpeg", "image/png", "image/gif"].includes(
                        value[0].type
                      ) || "유효한 이미지 파일이 아닙니다"
                    );
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                />
              )}
            />
            {errors.image && (
              <ErrorMessage>{errors.image.message}</ErrorMessage>
            )}
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">등록</Button>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RegisterTimerModal;

// 스타일드 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
