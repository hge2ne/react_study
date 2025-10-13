import Input from "./input";

export default function NewProject() {
  return (
    <div>
      <menu>
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <Input label="Title" />
        <Input label="Description" textarea={True} />{" "}
        {/* textarea={True} 대신 textarea 해도 True로 설정됨(반대 !) */}
        <Input label="Due Date" />
      </div>
    </div>
  );
}
