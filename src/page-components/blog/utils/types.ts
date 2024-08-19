import type { IBlog } from "@/types/blog";

export interface IBlogNavMenuProps {
	allTags: string[];
	handleSearch: (searchTerm: string) => void;
}
export interface IBlogBodyProps {
	handleSearch: (searchTermData: string) => void;
	allBlogs: IBlog[];
	loading: boolean;
}
