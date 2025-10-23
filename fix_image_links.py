import os
import re

def fix_image_links(intermediate_folder):
    md_root = os.getcwd()  # Use current working directory
    img_root = os.path.join(md_root, 'img', intermediate_folder)
    
    # Create img_root if it doesn't exist
    os.makedirs(img_root, exist_ok=True)

    # Traverse all files and subfolders in md_root
    for dirpath, dirnames, filenames in os.walk(md_root):
        for filename in filenames:
            if filename.endswith('.md'):
                md_path = os.path.join(dirpath, filename)
                
                # Calculate relative directory from md_root
                relative_dir = os.path.relpath(dirpath, md_root).replace('\\', '/')
                if relative_dir == '.':
                    relative_dir = ''
                
                # Read md content
                with open(md_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Find and replace image links
                def replace_link(match):
                    old_link = match.group(1)  # e.g., image_005.jpg
                    new_link = f"/img/{intermediate_folder}/{old_link}"
                    
                    # Move image file
                    old_img_path = os.path.join(dirpath, old_link)
                    if os.path.exists(old_img_path):
                        new_img_path = os.path.join(img_root, old_link)
                        os.makedirs(os.path.dirname(new_img_path), exist_ok=True)
                        os.rename(old_img_path, new_img_path)
                        print(f"✅ Moved image: {old_img_path} -> {new_img_path}")
                    else:
                        print(f"⚠️ Image not found: {old_img_path}")
                    
                    return match.group(0).replace(old_link, new_link)
                
                new_content = re.sub(r'\!\[.*?\]\((image_\d{3}\.\w+)\)', replace_link, content)
                
                # Write back to md file
                with open(md_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"✅ Updated Markdown: {md_path}")

    print(f"\n🎉 Done! Images moved to: {os.path.abspath(img_root)}")

# Example usage
if __name__ == "__main__":
    intermediate_folder = input("请输入中间文件夹名称 (例如 'pic for DL'): ")
    fix_image_links(intermediate_folder)