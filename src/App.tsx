import  Button  from "./components/common/buttons/button";
import plusIcon from "./assets/plus.png";
import trashIcon from "./assets/trash.png";
import smileIcon from "./assets/smile.png";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px" }}>
      {/* Primary */}
      <section>
        <h3>Primary</h3>
        <h4>아래의 버튼은 4가지 다 적용이 된 거긴 합니다</h4>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="primary" size="lg" label="Enabled" />
            <Button variant="primary" size="lg" label="Disabled" disabled />
            <Button variant="primary" size="lg" label="Hover" />
            <Button variant="primary" size="lg" label="Pressed" />
            <Button variant="primary" size="lg" label="Focus" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="primary" size="md" label="Enabled" />
            <Button variant="primary" size="md" label="Disabled" disabled />
            <Button variant="primary" size="md" label="Hover" />
            <Button variant="primary" size="md" label="Pressed" />
            <Button variant="primary" size="md" label="Focus" />
          </div>
        </div>
      </section>

      {/* Secondary */}
      <section>
        <h3>Secondary</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="secondary" size="md" label="Enabled" />
            <Button variant="secondary" size="md" label="Disabled" disabled />
            <Button variant="secondary" size="md" label="Hover" />
            <Button variant="secondary" size="md" label="Pressed" />
            <Button variant="secondary" size="md" label="Focus" />
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
            <Button variant="outlined" size="lg" label="Enabled" />
            <Button variant="outlined" size="lg" label="Disabled" disabled />
            <Button variant="outlined" size="lg" label="Hover" />
            <Button variant="outlined" size="lg" label="Pressed" />
            <Button variant="outlined" size="lg" label="Focus" />
          </div>

          {/* 40 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="md" label="Enabled" />
            <Button variant="outlined" size="md" label="Disabled" disabled />
            <Button variant="outlined" size="md" label="Hover" />
            <Button variant="outlined" size="md" label="Pressed" />
            <Button variant="outlined" size="md" label="Focus" />
            <Button variant="outlined" size="md" icon={smileIcon} label="Enabled" />
            <Button variant="outlined" size="md" icon={smileIcon} label="Disabled" disabled />
          </div>

          {/* 36 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="sm" label="Enabled" />
            <Button variant="outlined" size="sm" label="Disabled" disabled />
            <Button variant="outlined" size="sm" label="Hover" />
            <Button variant="outlined" size="sm" label="Pressed" />
            <Button variant="outlined" size="sm" label="Focus" />
            <Button variant="outlined" size="sm" icon={smileIcon} label="Enabled" />
            <Button variant="outlined" size="sm" icon={smileIcon} label="Disabled" disabled />
            {/* 쓰레기통 아이콘 버튼 */}
            <Button shape="trash" icon={trashIcon} />
            <Button shape="trash" icon={trashIcon} disabled />
          </div>

          {/* 28 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Button variant="outlined" size="xs" label="Enabled" />
            <Button variant="outlined" size="xs" label="Disabled" disabled />
            <Button variant="outlined" size="xs" label="Hover" />
            <Button variant="outlined" size="xs" label="Pressed" />
            <Button variant="outlined" size="xs" label="Focus" />
            <Button variant="outlined" size="xs" icon={smileIcon} label="Enabled" />
            <Button variant="outlined" size="xs" icon={smileIcon} label="Disabled" disabled />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
