import Button from "./components/common/buttons/button";
import plusIcon from "../assets/plus.png";
import trashIcon from "../assets/trash.png";
import smileIcon from "../assets/smile.png";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px" }}>
      {/* Primary */}
      <section>
        <h3>Primary</h3>
        <h4>아래의 버튼은 4가지 다 적용이 된 거긴 합니다</h4>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="primary" size="lg">Enabled</Button>
            <Button variant="primary" size="lg" disabled>Disabled</Button>
            <Button variant="primary" size="lg">Hover</Button>
            <Button variant="primary" size="lg">Pressed</Button>
            <Button variant="primary" size="lg">Focus</Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="primary" size="md">Enabled</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
            <Button variant="primary" size="md">Hover</Button>
            <Button variant="primary" size="md">Pressed</Button>
            <Button variant="primary" size="md">Focus</Button>
          </div>
        </div>
      </section>

      {/* Secondary */}
      <section>
        <h3>Secondary</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="secondary" size="md">Enabled</Button>
            <Button variant="secondary" size="md" disabled>Disabled</Button>
            <Button variant="secondary" size="md">Hover</Button>
            <Button variant="secondary" size="md">Pressed</Button>
            <Button variant="secondary" size="md">Focus</Button>
          </div>

          {/* 원형 버튼 (배경 있음 / 없음) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button shape="circle" icon={plusIcon} />
            <Button shape="circle" icon={plusIcon} disabled />
          </div>
        </div>
      </section>

      {/* Outlined */}
      <section>
        <h3>Outlined</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          {/* 56 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="lg">Enabled</Button>
            <Button variant="outlined" size="lg" disabled>Disabled</Button>
            <Button variant="outlined" size="lg">Hover</Button>
            <Button variant="outlined" size="lg">Pressed</Button>
            <Button variant="outlined" size="lg">Focus</Button>
          </div>

          {/* 40 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="md">Enabled</Button>
            <Button variant="outlined" size="md" disabled>Disabled</Button>
            <Button variant="outlined" size="md">Hover</Button>
            <Button variant="outlined" size="md">Pressed</Button>
            <Button variant="outlined" size="md">Focus</Button>
            <Button variant="outlined" size="md" icon={smileIcon}>Enabled</Button>
            <Button variant="outlined" size="md" icon={smileIcon} disabled>Disabled</Button>
          </div>

          {/* 36 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="sm">Enabled</Button>
            <Button variant="outlined" size="sm" disabled>Disabled</Button>
            <Button variant="outlined" size="sm">Hover</Button>
            <Button variant="outlined" size="sm">Pressed</Button>
            <Button variant="outlined" size="sm">Focus</Button>
            <Button variant="outlined" size="sm" icon={smileIcon}>Enabled</Button>
            <Button variant="outlined" size="sm" icon={smileIcon} disabled>Disabled</Button>
            {/* 쓰레기통 아이콘 버튼 */}
            <Button shape="trash" icon={trashIcon} />
            <Button shape="trash" icon={trashIcon} disabled />
          </div>

          {/* 28 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="xs">Enabled</Button>
            <Button variant="outlined" size="xs" disabled>Disabled</Button>
            <Button variant="outlined" size="xs">Hover</Button>
            <Button variant="outlined" size="xs">Pressed</Button>
            <Button variant="outlined" size="xs">Focus</Button>
            <Button variant="outlined" size="xs" icon={smileIcon}>Enabled</Button>
            <Button variant="outlined" size="xs" icon={smileIcon} disabled>Disabled</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
