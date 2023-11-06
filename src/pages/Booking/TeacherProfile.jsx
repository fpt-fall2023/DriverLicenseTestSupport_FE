/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */

export const TeacherProfile = ({ teacher }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
                src={teacher.avatar} 
                alt="teacher avatar" 
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '999px' }} 
            />
            <p>
                <div>{teacher?.name}</div>
                <div>{teacher?.email}</div>
                <div>{teacher?.phone}</div>
            </p>
        </div>
    )
}
