import { ApiTag } from "../types";
import { slugify } from "../utils/slugify";

type Props = {
  title: string;
  version: string;
  tags: ApiTag[];
};

const Sidebar = ({ title, version, tags }: Props) => (
  <aside className="sidebar">
    <div className="sidebar__brand">
      <div className="sidebar__dot" />
      <div>
        <div className="sidebar__title">{title}</div>
        <div className="sidebar__version">{version}</div>
      </div>
    </div>
    <div className="sidebar__nav">
      {tags.map((tag) => (
        <div key={tag.name} className="sidebar__group">
          <a className="sidebar__group-title" href={`#${slugify(tag.name)}`}>
            {tag.name}
          </a>
          <div className="sidebar__links">
            {tag.operations.map((op) => (
              <a className="sidebar__link" key={op.id} href={`#${op.id}`}>
                {op.summary}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </aside>
);

export default Sidebar;
