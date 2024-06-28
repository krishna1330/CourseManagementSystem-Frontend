export interface ICourses {
    courseId: number;
    courseName: string;
    masterId: number;
    masterName: string;
    coursePrice: number;
    courseAccessDurationInMonths: number;
    courseLanguage: string;
    courseCreatedDate: Date;
    thumbnail: string;
    isActive: boolean;
    isDeleted: boolean;
}