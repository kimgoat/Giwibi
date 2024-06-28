import { itemsApi } from "@apis/api";
import axios from "axios";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

interface TimerFormData {
  itemName: string;
  timerPeriod: number;
}

interface RegisterTimerModalProps {
  onClose: () => void;
  onSubmit: (data: TimerFormData) => void;
  categoryId: string;
}

const RegisterTimerModal: React.FC<RegisterTimerModalProps> = ({
  onClose,
  onSubmit,
  categoryId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TimerFormData>({
    defaultValues: {
      itemName: "",
      timerPeriod: 0,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onValid = async (data: TimerFormData) => {
    if (!selectedFile) {
      alert("이미지를 등록해주세요");
      return;
    }

    try {
      const formData = new FormData();

      const requestData = {
        name: data.itemName,
        cycle: data.timerPeriod,
        categoryId: parseInt(categoryId, 10),
      };

      formData.append("request", JSON.stringify(requestData));
      formData.append("file", selectedFile);

      const response = await itemsApi.addItem(formData);
      console.log("Item added successfully:", response.data);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data);
        alert(
          `아이템 추가 중 오류가 발생했습니다: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown Error:", error);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>새 타이머 등록</h2>
        <Form onSubmit={handleSubmit(onValid)}>
          <FormGroup>
            <Label htmlFor="itemName">아이템 이름</Label>
            <Controller
              name="itemName"
              control={control}
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
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
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
