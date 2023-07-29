import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import { Input } from "./components/Input";
import { defaultTheme } from "./components/themes/defaultTheme";
import Logo from "./assets/images/logo.svg";
import Label from "./components/Label";
import Tip from "./components/Tip";
import Results from "./components/Results";

const MAX_PERSONS = 9;

export default function Calculator() {
  const [bill, setBill] = useState<number | undefined>(undefined);
  const [people, setPeople] = useState<number | undefined>(undefined);
  const [tip, setTip] = useState<number | undefined>(undefined);

  const [peopleError, setPeopleError] = useState(false);

  const alright =
    bill !== undefined && people !== undefined && tip !== undefined;
  const tipAmount = alright ? ((bill * tip) / people).toFixed(2) : undefined;
  const totalPerPerson = alright
    ? ((bill * (1 + tip)) / people).toFixed(2)
    : undefined;
  const showTip = alright && !(tipAmount === "NaN" || tipAmount === "Infinity");
  const showTotal =
    alright && !(totalPerPerson === "NaN" || totalPerPerson === "Infinity");

  useEffect(() => {
    if (people === 0) {
      setPeopleError(true);
    } else {
      setPeopleError(false);
    }
  }, [people]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Container>
        <Image src={Logo} />

        <CalculatorContainer>
          <InputsContainer>
            <Label>Bill</Label>
            <InputWithMargin
              iconType="bill"
              placeholder="0"
              type="number"
              min={0}
              value={bill}
              onChange={(e) => {
                if (e.target.value.length < 9) {
                  setBill(e.target.valueAsNumber);
                }
              }}
            />

            <Tip setTip={setTip} tip={tip} />

            <Label>People</Label>
            <InputWithMargin
              iconType="person"
              placeholder="0"
              type="number"
              value={people}
              min={0}
              onKeyDown={(e) => {
                if (e.key === ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                if (e.target.value.length < MAX_PERSONS) {
                  setPeople(e.target.valueAsNumber);
                }
              }}
            />
          </InputsContainer>

          <Results
            showTip={showTip}
            showTotal={showTotal}
            totalPerPerson={totalPerPerson}
            tipAmount={tipAmount}
          />
        </CalculatorContainer>
      </Container>
    </ThemeProvider>
  );
}

const InputsContainer = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  padding: 50px 0 40px 0;
`;

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 25px 25px 0 0;
  overflow: hidden;
  padding: 24px;
  width: 100%;
`;

const InputWithMargin = styled(Input)`
  margin-bottom: 32px;
`;
