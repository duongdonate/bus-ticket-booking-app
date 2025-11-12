"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Camera } from "lucide-react";

interface ProfileData {
  fullName: string;
  phone: string;
  gender: string;
  email: string;
  birthDate: string;
  address: string;
  occupation: string;
}

export default function ThongTinChungPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Trần Hữu Nghĩa",
    phone: "0903947590",
    gender: "Nam",
    email: "nghiatran0309@gmail.com",
    birthDate: "2004-09-03",
    address: "",
    occupation: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("/placeholder-avatar.jpg");

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (isEditing) {
      setProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (1MB)
      if (file.size > 1024 * 1024) {
        alert("Dung lượng file tối đa 1 MB");
        return;
      }

      // Check file type
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        alert("Chỉ chấp nhận định dạng JPEG, PNG");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call to update profile
    console.log("Profile updated:", profileData);
    console.log("Avatar file:", avatarFile);
    
    // Show success message
    alert("Cập nhật thông tin thành công!");
    
    // Disable editing mode
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      {/* Header - Outside border */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Thông tin tài khoản</h1>
        <p className="text-gray-600 text-sm">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>

      {/* Content with border */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-3 w-40">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative group">
                <Image
                  src={avatarPreview}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
                {/* Overlay button on hover */}
                <button
                  type="button"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full px-4 py-1 border-gray-300 text-xs"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                Chọn ảnh
              </Button>
              
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleAvatarChange}
                className="hidden"
              />
              
              <p className="text-xs text-gray-500 text-center leading-tight">
                Dung lượng file tối đa 1 MB<br />
                Định dạng: JPEG, PNG
              </p>
            </div>

            {/* Form Fields - Right Side */}
            <div className="flex-1 space-y-4 max-w-lg">
              {/* Họ và tên */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Họ và tên</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="flex-1 h-9 text-sm"
                    required
                  />
                ) : (
                  <span className="flex-1 text-sm">{profileData.fullName}</span>
                )}
              </div>

              {/* Số điện thoại */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Số điện thoại</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="flex-1 h-9 text-sm"
                    type="tel"
                    required
                  />
                ) : (
                  <span className="flex-1 text-sm">{profileData.phone}</span>
                )}
              </div>

              {/* Giới tính */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Giới tính</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <SelectTrigger className="flex-1 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="flex-1 text-sm">{profileData.gender}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Email</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="flex-1 h-9 text-sm"
                    type="email"
                    required
                  />
                ) : (
                  <span className="flex-1 text-sm">{profileData.email}</span>
                )}
              </div>

              {/* Ngày sinh */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Ngày sinh</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    className="flex-1 h-9 text-sm"
                    type="date"
                  />
                ) : (
                  <span className="flex-1 text-sm">{formatDate(profileData.birthDate)}</span>
                )}
              </div>

              {/* Địa chỉ */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Địa chỉ</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder=""
                    className="flex-1 h-9 text-sm"
                  />
                ) : (
                  <span className="flex-1 text-sm">{profileData.address || "-"}</span>
                )}
              </div>

              {/* Nghề nghiệp */}
              <div className="flex items-center">
                <Label className="w-28 text-gray-700 text-sm">Nghề nghiệp</Label>
                <span className="mx-2">:</span>
                {isEditing ? (
                  <Input
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder=""
                    className="flex-1 h-9 text-sm"
                  />
                ) : (
                  <span className="flex-1 text-sm">{profileData.occupation || "-"}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-4 gap-3">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={handleEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-sm rounded-full font-medium flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-2 text-sm rounded-full"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-sm rounded-full font-medium"
                    >
                      Cập nhật
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}