import MainContainer from "@/components/MainContainer";
import ItemCard from "@/components/card/ItemCart";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineFileProtect } from "react-icons/ai";

const SaleMasterPage = () => {
  const navigate = useNavigate();

  const goTo = (route: string) => navigate("/sale/" + route);

  return (
    <>
      <MainContainer title="Sales">
        <ItemCard
          title="Sales Quotation"
          icon={<AiOutlineFileProtect />}
          onClick={() => goTo("sales-quotation")}
        />
        <ItemCard title="Sales Order" icon={<AiOutlineFileAdd />} />
      </MainContainer>
    </>
  );
};

export default SaleMasterPage;
